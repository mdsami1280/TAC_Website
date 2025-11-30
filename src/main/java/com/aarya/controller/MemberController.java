package com.aarya.controller;

import com.aarya.model.Member;
import com.aarya.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin
public class MemberController {
    
    @Autowired
    private MemberService memberService;

    @GetMapping
    public List<Member> findAllMembers() {
        return memberService.findAllMembers();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Member> findMember(@PathVariable Long id) {
        try {
            Member member = memberService.findMember(id);
            return ResponseEntity.ok(member);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> addMember(@Valid @RequestBody Member member) {
        try {
            String result = memberService.addMember(member);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMember(@PathVariable Long id, @Valid @RequestBody Member member) {
        try {
            String result = memberService.updateMember(id, member);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeMember(@PathVariable Long id) {
        try {
            String result = memberService.removeMember(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}