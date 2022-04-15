package com.cdac.LearningPie.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.LearningPie.dto.UserDto;
import com.cdac.LearningPie.entity.GroupInfo;
import com.cdac.LearningPie.entity.User;
import com.cdac.LearningPie.repository.UserDao;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
    private UserDao userDao;
	@Autowired
	private EmailService emailService;
	
	@Override
	public void registerUser(User user) {
	    user.setPassword(PasswordEncryption.bcryptPassword(user.getPassword()));
		userDao.save(user);	
		emailService.sendEmailForNewRegistration(user.getEmail());
		
	}

	@Override
	public User isExistingUser(String userName, String password) {
		User user=userDao.findByUserName(userName);
		if(user==null)
		{
			return null;
		}
		else if(user.isDeleted() == true) {
			return null;
		}
		else {
			//System.out.println(PasswordEncryption.bcryptPassword(password));
			BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
			if(	passwordEncoder.matches(password, user.getPassword()))
			{
				return user;
			}
			return null;
		}
		
	}
    
	@Override
	public User findByUserName(String userName){
		return userDao.findByUserName(userName);	
	}
	
	@Override
	public User findByUserNameAndEmail(String userName, String email) {
	 User user	= userDao.checkUserNameAndEmail(userName, email);
	 if(user == null) {
		return null;
	 }
	 else {
		 return user;
	 }
	}
	
	@Override
	public int updateUser(String name, String email, String phoneNo, String password, String userName) {
		String pass = PasswordEncryption.bcryptPassword(password);

		return userDao.updateUser(name, email, phoneNo, pass, userName);
	}
	
	@Override
	public List<User> getAllUsers() {
		return userDao.getAllUsersNotDeleted();
	}
	
	@Override
	public User getUser(String userName) {
		return userDao.getUser(userName);
	}
	
	@Override
	public void deleteUser(int userId) {
		userDao.deleteUser(userId);
	}

	@Override
	public void joinGroupByUserId(int userId,int groupId) {
		if (isExistingMember(userId, groupId) == null) {
			userDao.joinGroup(userId, groupId);
		}
	}
	
	public Object isExistingMember(int userId,int groupId) {
		return userDao.existingMember(userId,groupId);
	}

	public User findByUserId(int userId) {
		return userDao.findById(userId);
	}

	@Override
	public void updateUser(User u) {
		userDao.save(u);
		
	}

	@Override
	public void deleteAll(int[] array) {
		for(int userId:array)
		{
			userDao.deleteUser(userId);
		}
	}

	@Override
	public String findUserByEmail(String email) { 
		User user =userDao.findByEmail(email);
	     if(user !=null) {	
	    	 if(user.isDeleted()== true) {
	    		 return "de-register user";
	    	 }
	    	 else {
	    	 String otp=OTPService.generateOtp();
	    	
	    	 emailService.sendOtpToMail(email, otp,user.getUserName());
	    	 user.setToken(otp);
	    	 userDao.save(user);
	    	 return "Valid Email";
	    	 }
	     }
	     return "Not Valid Email";
	}

	@Override
	public int updatePassword(String otp, String password, String userName) {
		User user=userDao.findByUserName(userName);
		
		if(otp.equals(user.getToken())) {
			BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
			if(	passwordEncoder.matches(password, user.getPassword())) {
				System.out.println(-1);
				return -1;
			}
			
			String pass = PasswordEncryption.bcryptPassword(password);
			
			userDao.updatePassword(pass, userName);
			return 1;
		}
		System.out.println(0);
		return 0;
	}

	

//	@Override
//	public int updatePassword(String password, String email) {
//		  String pass = PasswordEncryption.bcryptPassword(password);
//		  userDao.updatePassword(pass, email);
//		  return 1;
//	}
	
}
