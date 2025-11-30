package com.aarya.controller;

import com.aarya.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.aarya.service.Aaryaservices;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventController {
	
    @Autowired
    private Aaryaservices service;

    @GetMapping
    public List<Event> findAllRecords() {
        return service.findAllRecords();
    }
    
    @GetMapping("/{id}")
	public Event findRecord(@PathVariable Integer id) {
		return service.findRecord(id);
    }

    @PostMapping
    public String addRecord(@RequestBody Event event) {
        return service.addRecord(event);
    }

    @PutMapping("/{id}")
    public String updateRecord(@PathVariable Integer id, @RequestBody Event event) {
        event.setId(id);
        return service.updateRecord(id, event);
    }

    @DeleteMapping("/{id}")
    public String removeRecord(@PathVariable Integer id) {
       return service.removeRecord(id);
    }
}