package com.aarya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aarya.model.Event;
import com.aarya.repository.EventRepository;
import java.util.*;


@Service
public class AaryaserviceImpl implements Aaryaservices {
		
		@Autowired
		private EventRepository dao;

		
		public String addRecord(Event event)
		{
			dao.save(event);
			return "add record";
		}
		
		public List<Event> findAllRecords(){
			return dao.findAll();
		}

		@Override
		public Event findRecord(Integer id) {
			return dao.findById(id).get();
		}

		@Override
		public String removeRecord(Integer id) {
			dao.deleteById(id);
			return "Record Deleted";
		}

		@Override
		public String updateRecord(Integer id, Event event) {
			// TODO Auto-generated method stub
			dao.save(event);
			return "Record Updated";
		}

		
		
		
		
		
		
		
		

	}



