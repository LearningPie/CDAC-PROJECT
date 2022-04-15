package com.cdac.LearningPie.Controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.LearningPie.Services.FileService;
import com.cdac.LearningPie.dto.UploadPdfDetails;
import com.cdac.LearningPie.entity.Files;

@RestController
@CrossOrigin
public class FileController {

	@Autowired
	private FileService fileService;

	@PostMapping("/upload-pdfs")
	public String uploadPic(UploadPdfDetails profilePicDetails) {

		return fileService.uploadFile(profilePicDetails);

	}

//	@GetMapping("/getAllFilesByGroupId")
//	public List<Files> getAllFilesByGroupId(){
//		return fileService.getAll();
//		
//	}
}
