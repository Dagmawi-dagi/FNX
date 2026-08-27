/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  content: string;
  isBreaking?: boolean;
  views?: number;
}

export type Article = NewsItem & {
  views: number;
};

export interface EventItem {
  id: string;
  title: string;
  category: 'Liturgical Feast' | 'Conference' | 'Peace Dialogue' | 'Choir Concert' | 'Broadcast';
  date: string;
  time: string;
  location: string;
  description: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  isLiveBroadcast?: boolean;
}

export interface VacancyItem {
  id: string;
  title: string;
  department: 'Editorial & News' | 'Broadcast & Engineering' | 'Theology & Research' | 'Digital & Social' | 'Translation & Outreach' | string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer' | string;
  location: 'Addis Ababa (On-site)' | 'Hybrid' | 'Remote / Diaspora' | string;
  deadline: string;
  experience: string;
  description: string;
  requirements: string[];
}

export type Vacancy = VacancyItem;

export interface SocialChannelItem {
  id: string;
  name: string;
  platform: string;
  handle: string;
  subscribers: string;
  followers?: string;
  description: string;
  link: string;
  url: string;
  icon: string;
  badge: string;
  color: string;
}

export type CharityCategory = 
  | 'Monastery Support' 
  | 'Elderly & Orphan Care' 
  | 'Food & Relief Aid' 
  | 'Youth & Education' 
  | 'Medical Caravan' 
  | 'Heritage Restoration';

export interface CharityProject {
  id: string;
  title: string;
  category: CharityCategory;
  location: string;
  date: string;
  description: string;
  beneficiaries: string;
  targetAmount?: string;
  raisedAmount?: string;
  status: 'Active' | 'Completed' | 'Ongoing';
  imageUrl: string;
  organizer: string;
  impactHighlight?: string;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode?: string;
}

export type NewsletterTopic = 
  | 'liturgy_feasts' 
  | 'monasteries_charity' 
  | 'sermons_patristics' 
  | 'peace_dialogue' 
  | 'youth_education' 
  | 'breaking_news';

export type NewsletterFrequency = 'weekly' | 'daily' | 'monthly' | 'special_alerts';

export interface SubscriberItem {
  id: string;
  email: string;
  name?: string;
  frequency: NewsletterFrequency;
  topics: NewsletterTopic[];
  language: Language;
  subscribedAt: string;
  status: 'active' | 'unsubscribed' | 'paused';
  location?: string;
  source?: string;
}

export interface NewsletterDispatch {
  id: string;
  subject: string;
  edition: string;
  preheader: string;
  targetTopics: NewsletterTopic[];
  targetFrequency: NewsletterFrequency | 'all';
  targetLanguage?: Language | 'all';
  status: 'sent' | 'draft' | 'scheduled';
  sentAt?: string;
  scheduledFor?: string;
  recipientsCount: number;
  openRate?: string;
  clickRate?: string;
  clicksCount?: number;
  content: string;
  author: string;
}

export type Category = 'Home' | 'Spiritual' | 'Ethiopia' | 'Multimedia' | 'Podcast' | 'Social' | 'Arts' | 'About Us' | 'Blog' | 'Events' | 'Socials' | 'Vacancy' | 'Admin' | 'Newsletter';

export type Language = 'en' | 'am' | 'ti' | 'or';

export interface TranslationSchema {
  nav: { [key: string]: string };
  ui: { [key: string]: string };
  categories: { [key in Category]?: string } & { [key: string]: string };
}

