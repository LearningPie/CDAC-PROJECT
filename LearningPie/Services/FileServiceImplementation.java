package com.cdac.LearningPie.Services;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.cdac.LearningPie.dto.ProfilePicDetails;
import com.cdac.LearningPie.dto.UploadPdfDetails;
import com.cdac.LearningPie.entity.Files;
import com.cdac.LearningPie.repository.FileDao;

@Service
public class FileServiceImplementation implements FileService{
	@Autowired
	private FileDao fileDao;

	@Override
	public String uploadFile(UploadPdfDetails profilePicDetails) {
		
		
		PdfValidator pdfValidator = new PdfValidator();
		try {
			if (pdfValidator.isValidPDF(profilePicDetails.getProfilePic().getBytes()))
			{
				// store the image in some folder
				String uploadedPicName = profilePicDetails.getProfilePic().getOriginalFilename();
				String fileName = profilePicDetails.getGroupId() + "-" + uploadedPicName;

				try {
					FileCopyUtils.copy(profilePicDetails.getProfilePic().getInputStream(), new FileOutputStream(
							"F:\\FINAL PROJECT\\Front End git\\learningpie\\public\\Uploaded\\Pdf\\"
									+ fileName));
				} catch (IOException e) {
					// hoping there won't be any error
				}
				
				fileDao.upload(profilePicDetails.getGroupId(), fileName);
				return "pdf uploaded sucessfully";
			}
			else {
				
				 return "pdf not valid";
			}

//				System.out.println(profilePicDetails.getProfilePic().getOriginalFilename());
		} catch (IOException e1) {

			e1.printStackTrace();
		}
		System.out.println(profilePicDetails.getGroupId());

		
		return "";
		
	}

  

}
