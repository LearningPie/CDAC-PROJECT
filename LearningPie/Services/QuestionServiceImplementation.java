package com.cdac.LearningPie.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.LearningPie.entity.Questions;
import com.cdac.LearningPie.repository.QuestionsDao;

@Service
public class QuestionServiceImplementation implements QuestionService {

	@Autowired
	QuestionsDao questiondao;
	@Override
	public Questions postQuestion(Questions question) {
	  return questiondao.save(question);
	}
	@Override
	public List<Questions> getAllQuestions() {
		return questiondao.getAllNotDeletedQuestions();
		
	}
	@Override
	public List<Questions> getAllQuestionsBySubject(String subject) {
		
		return questiondao.getAllQuestionBySubject(subject);
	}
	public Map<String,Integer> getCountOfQuestionsBySubject(){
		String[] array= {"Java","ADS","AdvJava","OS","Database","Reactjs","JS","WPT","C++","DotNet","Python","Swift"};
	    Map<String,Integer> countOfQuestions=new HashMap<String, Integer>();
		for(String subject:array) {
			int size=questiondao.getAllQuestionBySubject(subject).size();
			countOfQuestions.put(subject, size);
		}
		return countOfQuestions;
	}

	@Override
	public List<Questions> getAllQuestionsByUser(int userId) {
		return questiondao.getAllByUser(userId);
	}
	@Override
	public void deleteQuestionById(int questionId) {
		questiondao.deleteQuestion(questionId);
	}
	@Override
	public void deleteAll(int[] array) {
		for( int questionId:array)
		{
			questiondao.deleteQuestion(questionId);
		}
	}
	@Override
	public String postQuestionByUser(Questions question,int groupId) {
		questiondao.save(question);
		questiondao.changeGroupId(groupId,question.getQuestionId());
		return "Sucessfully";
	}

	

}
