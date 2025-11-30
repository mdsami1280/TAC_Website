package com.aarya.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String date;
    private String description;
    private String imageUrl;
    private String registrationFormUrl;
    private String photoGalleryUrl;
    private String category;
    private String location;
    private Integer maxParticipants;
    private Integer currentParticipants;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public String getRegistrationFormUrl() {
		return registrationFormUrl;
	}
	public void setRegistrationFormUrl(String registrationFormUrl) {
		this.registrationFormUrl = registrationFormUrl;
	}
	
	public String getPhotoGalleryUrl() {
		return photoGalleryUrl;
	}
	public void setPhotoGalleryUrl(String photoGalleryUrl) {
		this.photoGalleryUrl = photoGalleryUrl;
	}
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	public Integer getMaxParticipants() {
		return maxParticipants;
	}
	public void setMaxParticipants(Integer maxParticipants) {
		this.maxParticipants = maxParticipants;
	}
	
	public Integer getCurrentParticipants() {
		return currentParticipants;
	}
	public void setCurrentParticipants(Integer currentParticipants) {
		this.currentParticipants = currentParticipants;
	}
}
