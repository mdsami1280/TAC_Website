import { api } from './api';

export interface Member {
  id?: number;
  name: string;
  position: string;
  email: string;
  imageUrl?: string;
  description?: string;
  active: boolean;
}

export interface CreateMemberRequest {
  name: string;
  position: string;
  email: string;
  imageUrl?: string;
  description?: string;
  active?: boolean;
}

class MemberService {
  async getMembers(): Promise<Member[]> {
    const response = await api.get<Member[]>('/members');
    return response.data;
  }

  async getMember(id: number): Promise<Member> {
    const response = await api.get<Member>(`/members/${id}`);
    return response.data;
  }

  async createMember(memberData: CreateMemberRequest): Promise<string> {
    const response = await api.post<string>('/members', memberData);
    return response.data;
  }

  async updateMember(id: number, memberData: Partial<Member>): Promise<string> {
    const response = await api.put<string>(`/members/${id}`, memberData);
    return response.data;
  }

  async deleteMember(id: number): Promise<string> {
    const response = await api.delete<string>(`/members/${id}`);
    return response.data;
  }
}

export const memberService = new MemberService();
