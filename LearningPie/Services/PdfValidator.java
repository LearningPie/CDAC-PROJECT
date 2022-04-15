package com.cdac.LearningPie.Services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Arrays;


public class PdfValidator {
	
	public static boolean isValidPDF(byte[] docByteArray) {
		System.out.println("INSIDE isValidPDF");
		File docFile= new File("validationPdf.txt");
		OutputStream outpurStream = null;
		boolean flag1 = false;
		boolean flag2 = false;
		String str;
		
		try {
			System.out.println("INSIDE isValidPDF : try Block");
			outpurStream = new FileOutputStream(docFile);
			
			outpurStream.write(docByteArray);
			
			BufferedReader reader = new BufferedReader(new FileReader(docFile));
			
			byte[] slice = Arrays.copyOfRange(docByteArray, docByteArray.length-10, docByteArray.length);
			
			while ((str = reader.readLine()) != null) {
				if(str.contains("%PDF")){
					flag1=true;
//					logger.info("INSIDE isValidPDF : while(). Flag1 = true");
					break;
				}
				else
					break;
				}
			Charset charset = Charset.forName("UTF-8");
			String string = new String(slice, charset);
			if(string.contains("%%EOF")) {
				flag2= true;
//				logger.info("INSIDE isValidPDF : Flag2 = true");
			}
		} catch (IOException e) {
			System.out.println("INSIDE isValidPDF : catch Block");
			System.out.println("IOException in isValidPDF : {}"+e);
		}
		catch(Exception e) {
			System.out.println("INSIDE isValidPDF : catch Block");
			System.out.println("Exception in isValidPDF : {}"+e);
		}
		if(flag1 == true && flag2 == true) {
			System.out.println("Uploaded file is a valid Pdf document");
			return true;
		}
		System.out.println("Uploaded file is not a valid Pdf document");
		return false;
	}

}
