import { supabase } from '@/lib/supabase';

export const INQUIRY_TOPICS = [
  { value: 'general', label: 'General question' },
  { value: 'adventures', label: 'Fishing adventures' },
  { value: 'shop', label: 'Shop and orders' },
  { value: 'membership', label: 'Membership' },
  { value: 'partnerships', label: 'Brand partnerships' },
] as const;

export type InquiryTopic = (typeof INQUIRY_TOPICS)[number]['value'];

export interface ContactInquiryInput {
  name: string;
  email: string;
  topic: InquiryTopic;
  message: string;
}

export async function submitContactInquiry(input: ContactInquiryInput): Promise<void> {
  const { error } = await supabase.from('contact_inquiries').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    topic: input.topic,
    message: input.message.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }
}
