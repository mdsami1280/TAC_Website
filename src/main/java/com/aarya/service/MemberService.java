package com.aarya.service;

import java.util.List;
import com.aarya.model.Member;

public interface MemberService {
    String addMember(Member member);
    List<Member> findAllMembers();
    Member findMember(Long id);
    String removeMember(Long id);
    String updateMember(Long id, Member member);
} 