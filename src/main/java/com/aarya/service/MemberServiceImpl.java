package com.aarya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aarya.model.Member;
import com.aarya.repository.MemberRepository;
import java.util.*;

@Service
public class MemberServiceImpl implements MemberService {
    
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public String addMember(Member member) {
        memberRepository.save(member);
        return "Member added successfully";
    }

    @Override
    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member findMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    @Override
    public String removeMember(Long id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return "Member removed successfully";
        }
        return "Member not found";
    }

    @Override
    public String updateMember(Long id, Member member) {
        if (memberRepository.existsById(id)) {
            member.setId(id);
            memberRepository.save(member);
            return "Member updated successfully";
        }
        return "Member not found";
    }
} 