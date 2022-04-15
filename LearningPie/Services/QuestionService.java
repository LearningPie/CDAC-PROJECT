package com.cdac.LearningPie.Services;

import java.util.List;
import java.util.Map;

import com.cdac.LearningPie.entity.Questions;

public interface QuestionService {
     public Questions postQuestion(Questions question);
     public List<Questions> getAllQuestions();
     public List<Questions> getAllQuestionsBySubject(String subject);
	 public List<Questions> getAllQuestionsByUser(int userId);
	 public void deleteQuestionById(int questionId);
	 public void deleteAll(int[] array);
	 public String postQuestionByUser(Questions question,int groupId);
	 public Map<String,Integer> getCountOfQuestionsBySubject();
} 
