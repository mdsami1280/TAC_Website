package com.aarya.service;
import java.util.List;
import com.aarya.model.Event;

public interface Aaryaservices {
	
		String addRecord(Event event);
		List<Event>findAllRecords();
		Event findRecord(Integer id);
		String removeRecord(Integer id);
		String updateRecord(Integer id,Event event );

	}

	


