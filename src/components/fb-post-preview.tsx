'use client'

import type React from 'react'
import { useState, forwardRef, useEffect } from 'react'

// ──────────── 2014 Facebook Inline SVG Icons ────────────

function ThumbsUpIcon({ size = 13, color = '#7f7f7f' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={color}>
      <path d="M18.2 12.3c0-.3-.1-.5-.3-.7l-4.9-4.9c-.2-.2-.5-.3-.7-.3H9v7c0 .3.1.5.3.7l4.9 4.9c.2.2.5.3.7.3.3 0 .5-.1.7-.3l2.3-2.3c.2-.2.3-.5.3-.7v-2.7zm-7.4-2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7z" />
    </svg>
  )
}

function FilledThumbsUp({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 7h-4V2c0-.6-.4-1-1-1-.3 0-.5.1-.7.3L4 6.6V15h10.8c.6 0 1.1-.5 1.2-1.1L17 8.1c0-.6-.4-1.1-1-1.1zM2 6.6V15H1c-.6 0-1-.4-1-1V7.6c0-.6.4-1 1-1h1z" fill="#3b5998"/>
    </svg>
  )
}

function MiniFilledHeart({ size = 10 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14s-5.5-3.5-5.5-7.5C2.5 4.5 4 3 5.5 3c1 0 2 .5 2.5 1.5C8.5 3.5 9.5 3 10.5 3c1.5 0 3 1.5 3 3.5C13.5 10.5 8 14 8 14z" fill="#e74c3c"/>
    </svg>
  )
}

function MiniHahaFace({ size = 10 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="#f7b928"/>
      <circle cx="5.5" cy="6.5" r="1" fill="#fff"/>
      <circle cx="10.5" cy="6.5" r="1" fill="#fff"/>
      <path d="M5 10c0 0 1.5 2.5 3 2.5s3-2.5 3-2.5" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function GlobeIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="10" cy="10" rx="3.5" ry="8" fill="none" stroke={color} strokeWidth="1"/>
      <line x1="2" y1="10" x2="18" y2="10" stroke={color} strokeWidth="1"/>
      <path d="M3 7h14" fill="none" stroke={color} strokeWidth="0.7"/>
      <path d="M3 13h14" fill="none" stroke={color} strokeWidth="0.7"/>
    </svg>
  )
}

function FriendsIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="3" fill="none" stroke={color} strokeWidth="1.3"/>
      <circle cx="14" cy="7" r="2.5" fill="none" stroke={color} strokeWidth="1.1"/>
      <path d="M1 16c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14 10.5c2.8 0 5 2 5 4.5" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function LockIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="9" width="12" height="8" rx="1.5" fill="none" stroke={color} strokeWidth="1.3"/>
      <path d="M7 9V6.5a3 3 0 016 0V9" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="10" cy="13" r="1" fill={color}/>
    </svg>
  )
}

function CommentBubbleIcon({ size = 13, color = '#7f7f7f' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={color}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  )
}

function ShareArrowIcon({ size = 13, color = '#7f7f7f' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={color}>
      <path d="M15 5l-1.4 1.4L18.2 11H2v2h16.2l-4.6 4.6L15 19l7-7-7-7z" />
    </svg>
  )
}

function PinIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C6.1 0 3 3.1 3 7c0 4.5 7 13 7 13s7-8.5 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S8.6 4.5 10 4.5s2.5 1.1 2.5 2.5S11.4 9.5 10 9.5z" fill={color}/>
    </svg>
  )
}

function SmileyIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.3"/>
      <circle cx="7" cy="8" r="1.2" fill={color}/>
      <circle cx="13" cy="8" r="1.2" fill={color}/>
      <path d="M6.5 12c0 0 1.5 2 3.5 2s3.5-2 3.5-2" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function DownDotsIcon({ size = 16, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="10" r="1.5" fill={color}/>
      <circle cx="10" cy="10" r="1.5" fill={color}/>
      <circle cx="16" cy="10" r="1.5" fill={color}/>
    </svg>
  )
}

function PhotoSmallIcon({ size = 14, color = '#5a7fb5' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="12" rx="1" fill="none" stroke={color} strokeWidth="1.3"/>
      <circle cx="7" cy="9" r="2" fill="none" stroke={color} strokeWidth="1"/>
      <path d="M2 14l5-5 3 3 4-5 4 7" fill="none" stroke={color} strokeWidth="1.1" strokeLinejoin="round"/>
    </svg>
  )
}

function VideoSmallIcon({ size = 14, color = '#5a7fb5' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="12" height="12" rx="1.5" fill="none" stroke={color} strokeWidth="1.3"/>
      <path d="M14 8l4-2.5v9L14 12" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}

function EventSmallIcon({ size = 14, color = '#5a7fb5' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="14" height="12" rx="1.5" fill="none" stroke={color} strokeWidth="1.3"/>
      <line x1="3" y1="9" x2="17" y2="9" stroke={color} strokeWidth="1.2"/>
      <line x1="7" y1="3" x2="7" y2="7" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="13" y1="3" x2="13" y2="7" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function CloseXIcon({ size = 12, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L4 12M4 4l8 8" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CakeIcon({ size = 12, color = '#3b5998' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="14" height="6" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="5" y="7" width="10" height="5" rx="1" fill={color} opacity="0.85"/>
      <rect x="8" y="4" width="4" height="5" rx="1" fill={color}/>
      <path d="M10 1.5v3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="1" r="1" fill={color}/>
    </svg>
  )
}

function SmallGlobeIcon({ size = 11, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="10" cy="10" rx="3.5" ry="8" fill="none" stroke={color} strokeWidth="0.9"/>
      <line x1="2" y1="10" x2="18" y2="10" stroke={color} strokeWidth="0.9"/>
    </svg>
  )
}

function SmallLockIcon({ size = 10, color = '#9197a3' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="10" height="7" rx="1.5" fill="none" stroke={color} strokeWidth="1.5"/>
      <path d="M7.5 10V8a2.5 2.5 0 015 0v2" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CalendarIcon({ size = 16, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="2" fill="none" stroke={color} strokeWidth="1.5"/>
      <line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth="1.5"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill={color} opacity="0.7"/>
      <rect x="14" y="12" width="3" height="3" rx="0.5" fill={color} opacity="0.7"/>
    </svg>
  )
}

function PlayButtonIcon({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="rgba(0,0,0,0.5)"/>
      <path d="M19 14l16 10-16 10V14z" fill="#ffffff" opacity="0.9"/>
    </svg>
  )
}

// ──────────── Types & Defaults ────────────

export type VisibilityOption = 'public' | 'friends' | 'onlyme'

export type PostBackgroundOption = 'white' | 'cream' | 'light-blue' | 'light-green' | 'light-yellow' | 'light-pink'

export type CommentSortOrder = 'top' | 'newest' | 'all'

export type EngagementVisibility = 'public' | 'friends' | 'custom'

export interface ReplyData {
  id: string
  name: string
  avatar: string
  text: string
  timestamp: string
}

export interface CommentData {
  id: string
  commenterName: string
  commenterAvatar: string
  commentText: string
  commentTimestamp: string
  commentLikes: number
  replies: ReplyData[]
}

export interface FBPostData {
  profilePicture: string
  userName: string
  timestamp: string
  postContent: string
  attachedImage: string
  attachedImages: string[]
  sharedLink: boolean
  linkTitle: string
  linkDomain: string
  linkDescription: string
  linkImage: string
  visibility: VisibilityOption
  likes: number
  comments: number
  shares: number
  topLikerName: string
  showCommentPreview: boolean
  commentsList: CommentData[]
  showNavBar: boolean
  highlightHashtags: boolean
  truncateLongPosts: boolean
  showSidebars: boolean
  showWatermark: boolean
  showPeopleAlsoLike: boolean
  // v5.0 new fields
  taggedFriends: string[]
  location: string
  feeling: string
  showMoreStories: boolean
  borderRadius: number
  postBackground: PostBackgroundOption
  // v6.0 new fields
  sharedByText: string
  isEdited: boolean
  engagementVisibility: EngagementVisibility
  commentSortOrder: CommentSortOrder
  // v7.0 new fields
  groupPostName: string
  groupPostAvatar: string
  // v8.0 new fields
  postType: 'default' | 'lifeevent'
  lifeEventCategory: string
  lifeEventDate: string
  lifeEventDescription: string
  postFontFamily: string
}

const defaultAvatar = '/fb-default-avatar.svg'

export const defaultComment: CommentData = {
  id: '1',
  commenterName: 'Mike Johnson',
  commenterAvatar: defaultAvatar,
  commentText: 'This looks amazing! Where is this place?',
  commentTimestamp: '2 hrs',
  commentLikes: 3,
  replies: [],
}

export const defaultPostData: FBPostData = {
  profilePicture: defaultAvatar,
  userName: 'John Doe',
  timestamp: 'October 12, 2014 at 4:30 PM',
  postContent: 'Just had the most amazing coffee at this little café downtown. The latte art was incredible! ☕ Sometimes it\'s the simple things that make your day. #blessed',
  attachedImage: '',
  attachedImages: [''],
  sharedLink: false,
  linkTitle: '',
  linkDomain: '',
  linkDescription: '',
  linkImage: '',
  visibility: 'public',
  likes: 42,
  comments: 8,
  shares: 3,
  topLikerName: 'Jane Smith',
  showCommentPreview: false,
  commentsList: [defaultComment],
  showNavBar: false,
  highlightHashtags: true,
  truncateLongPosts: false,
  showSidebars: false,
  showWatermark: false,
  showPeopleAlsoLike: false,
  // v5.0 defaults
  taggedFriends: [],
  location: '',
  feeling: '',
  showMoreStories: false,
  borderRadius: 3,
  postBackground: 'white',
  // v6.0 defaults
  sharedByText: '',
  isEdited: false,
  engagementVisibility: 'public',
  commentSortOrder: 'top',
  // v7.0 defaults
  groupPostName: '',
  groupPostAvatar: '',
  // v8.0 defaults
  postType: 'default',
  lifeEventCategory: '',
  lifeEventDate: '',
  lifeEventDescription: '',
  postFontFamily: 'default',
}

export const feelingOptions = [
  'feeling happy', 'feeling loved', 'feeling blessed', 'feeling grateful',
  'feeling excited', 'feeling sad', 'feeling angry', 'feeling tired',
  'feeling sick', 'feeling confused', 'feeling accomplished', 'feeling thankful',
]

export const postBackgroundOptions: { value: PostBackgroundOption; label: string; color: string }[] = [
  { value: 'white', label: 'White', color: '#ffffff' },
  { value: 'cream', label: 'Cream', color: '#fdf6e3' },
  { value: 'light-blue', label: 'Light Blue', color: '#e8f0fe' },
  { value: 'light-green', label: 'Light Green', color: '#e6f4ea' },
  { value: 'light-yellow', label: 'Light Yellow', color: '#fef7e0' },
  { value: 'light-pink', label: 'Light Pink', color: '#fce4ec' },
]

export const commentSortOptions: { value: CommentSortOrder; label: string }[] = [
  { value: 'top', label: 'Top Comments' },
  { value: 'newest', label: 'Newest Comments' },
  { value: 'all', label: 'All Comments' },
]

export const engagementVisibilityOptions: { value: EngagementVisibility; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'friends', label: 'Friends' },
  { value: 'custom', label: 'Custom' },
]

export const lifeEventCategoryOptions = [
  'Graduated from',
  'Started a new job',
  'Got married',
  'Got engaged',
  'Moved to a new city',
  'Got a new pet',
  'Traveled to',
  'Started a new hobby',
]

export const fontFamilyOptions = [
  { value: 'default', label: 'Default (Helvetica)', family: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { value: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
  { value: 'times', label: 'Times New Roman', family: "'Times New Roman', Times, serif" },
  { value: 'courier', label: 'Courier New', family: "'Courier New', Courier, monospace" },
  { value: 'trebuchet', label: 'Trebuchet MS', family: "'Trebuchet MS', Helvetica, sans-serif" },
  { value: 'verdana', label: 'Verdana', family: 'Verdana, Geneva, sans-serif' },
]

const moreStoriesData = [
  { name: 'Emily Davis', avatar: defaultAvatar, text: 'Had the best brunch today with friends! 🥞', time: '3 hrs' },
  { name: 'Alex Turner', avatar: defaultAvatar, text: 'Just finished a 5K run! New personal best 🏃‍♂️', time: '5 hrs' },
  { name: 'Rachel Kim', avatar: defaultAvatar, text: 'New profile picture. Thoughts? 😊', time: '8 hrs' },
]

const friendOnlineData = [
  { name: 'Amy Chen', status: '🎉 Having fun at the beach' },
  { name: 'Brian K.', status: 'Working from home' },
  { name: 'Maria S.', status: 'On vacation 🌴' },
]

export const presets: { name: string; emoji: string; data: FBPostData }[] = [
  {
    name: 'Coffee & Vibes',
    emoji: '☕',
    data: {
      ...defaultPostData,
      userName: 'Sarah Mitchell',
      timestamp: 'June 15, 2014 at 9:23 AM',
      postContent: 'Sunday morning coffee ritual ☕\n\nThere\'s something magical about slow mornings. No alarms, just the smell of fresh coffee and the sound of birds. This is what living feels like. ✨\n\n#SundayVibes #CoffeeLover #SlowLiving',
      likes: 127,
      comments: 24,
      shares: 5,
      topLikerName: 'Emily Davis',
      showCommentPreview: true,
      commentsList: [
        { id: '1', commenterName: 'Alex Turner', commenterAvatar: defaultAvatar, commentText: 'So jealous! I need a morning like that 😭', commentTimestamp: '3 hrs', commentLikes: 5, replies: [] },
        { id: '2', commenterName: 'Rachel Kim', commenterAvatar: defaultAvatar, commentText: 'Where is this café?? It looks gorgeous!', commentTimestamp: '2 hrs', commentLikes: 2, replies: [] },
      ],
      highlightHashtags: true,
      truncateLongPosts: false,
      location: 'Blue Bottle Coffee, San Francisco',
      feeling: 'feeling happy',
    },
  },
  {
    name: 'Birthday Post',
    emoji: '🎂',
    data: {
      ...defaultPostData,
      userName: 'Chris Parker',
      timestamp: 'March 8, 2014 at 12:00 PM',
      postContent: 'HAPPY BIRTHDAY to my amazing sister! 🎂🎈\n\nYou\'re not just my sister, you\'re my best friend. Here\'s to another year of adventures, laughter, and making memories together. Love you to the moon and back! 🌙💕',
      likes: 256,
      comments: 47,
      shares: 12,
      topLikerName: 'David Wilson',
      showCommentPreview: true,
      commentsList: [
        { id: '1', commenterName: 'Jessica Brown', commenterAvatar: defaultAvatar, commentText: 'Aww happy birthday to your sister!! 🎉🎉🎉', commentTimestamp: '1 hr', commentLikes: 8, replies: [
          { id: 'r1', name: 'Chris Parker', avatar: defaultAvatar, text: 'Thank you so much!! 🥰', timestamp: '50 min' },
          { id: 'r2', name: 'Emily Davis', avatar: defaultAvatar, text: 'Happy birthday to her!! 🎂', timestamp: '45 min' },
        ] },
        { id: '2', commenterName: 'Tom Richards', commenterAvatar: defaultAvatar, commentText: 'Happy birthday! Hope she has the best day ever 🥳', commentTimestamp: '45 min', commentLikes: 1, replies: [] },
        { id: '3', commenterName: 'Lisa Chen', commenterAvatar: defaultAvatar, commentText: 'Such a sweet post! 🥰', commentTimestamp: '30 min', commentLikes: 3, replies: [] },
      ],
      taggedFriends: ['Emily Davis', 'Tom Richards'],
    },
  },
  {
    name: 'Shared Link',
    emoji: '📱',
    data: {
      ...defaultPostData,
      userName: 'Tech Enthusiast',
      timestamp: 'September 22, 2014 at 3:45 PM',
      postContent: 'This new iPhone 6 looks incredible! The bigger screen is exactly what we needed. Who else is pre-ordering? 📱',
      sharedLink: true,
      linkTitle: 'Apple Introduces iPhone 6 and iPhone 6 Plus',
      linkDomain: 'apple.com',
      linkDescription: 'Apple today announced iPhone 6 and iPhone 6 Plus, the biggest advancements in the history of iPhone, featuring new designs with bigger, thinner displays.',
      attachedImage: '',
      likes: 89,
      comments: 31,
      shares: 15,
      topLikerName: 'Gadget Guru',
      showCommentPreview: true,
      commentsList: [
        { id: '1', commenterName: 'Sam Lee', commenterAvatar: defaultAvatar, commentText: 'The 6 Plus is too big IMO. 6 is perfect!', commentTimestamp: '45 min', commentLikes: 12, replies: [] },
        { id: '2', commenterName: 'Nina Patel', commenterAvatar: defaultAvatar, commentText: 'I just pre-ordered the 6 Plus. Can\'t wait! 📱', commentTimestamp: '30 min', commentLikes: 4, replies: [] },
      ],
    },
  },
  {
    name: 'Achievement',
    emoji: '🏆',
    data: {
      ...defaultPostData,
      userName: 'Marcus Johnson',
      timestamp: 'December 18, 2014 at 6:15 PM',
      postContent: '4 years of hard work and it finally happened... I got the promotion! 🎉🎉🎉\n\nThank you to everyone who believed in me, supported me through the late nights, and never let me give up. This one\'s for you. 💪\n\n#Blessed #Grateful #NewChapter #HardWorkPaysOff',
      likes: 534,
      comments: 89,
      shares: 23,
      topLikerName: 'Mom',
      showCommentPreview: true,
      commentsList: [
        { id: '1', commenterName: 'Linda Johnson', commenterAvatar: defaultAvatar, commentText: 'SO PROUD OF YOU!!! We always knew you could do it! ❤️❤️❤️', commentTimestamp: '30 min', commentLikes: 45, replies: [] },
        { id: '2', commenterName: 'Dad', commenterAvatar: defaultAvatar, commentText: 'Well done son! You earned this. 💪', commentTimestamp: '25 min', commentLikes: 22, replies: [] },
      ],
      highlightHashtags: true,
      feeling: 'feeling accomplished',
    },
  },
  {
    name: 'Throwback',
    emoji: '📸',
    data: {
      ...defaultPostData,
      userName: 'Jennifer Lopez',
      timestamp: 'February 14, 2014 at 8:00 PM',
      postContent: 'Found this old photo from 2008... oh how times have changed! 😂 #ThrowbackThursday #TBT #Memories #GoodOldDays',
      likes: 1892,
      comments: 156,
      shares: 43,
      topLikerName: 'Mark Zuckerberg',
      showCommentPreview: true,
      showNavBar: true,
      showSidebars: true,
      commentsList: [
        { id: '1', commenterName: 'Ashley Williams', commenterAvatar: defaultAvatar, commentText: 'HAHAHA I remember this! So funny 😂😂', commentTimestamp: '5 hrs', commentLikes: 34, replies: [] },
        { id: '2', commenterName: 'Ryan Martinez', commenterAvatar: defaultAvatar, commentText: 'The outfit though!! 🔥🔥', commentTimestamp: '4 hrs', commentLikes: 19, replies: [] },
        { id: '3', commenterName: 'Jessica Nguyen', commenterAvatar: defaultAvatar, commentText: 'We were so young! Miss those days 🥺', commentTimestamp: '3 hrs', commentLikes: 11, replies: [] },
      ],
      highlightHashtags: true,
      truncateLongPosts: false,
      taggedFriends: ['Ashley Williams', 'Ryan Martinez'],
    },
  },
  {
    name: 'Full Screenshot',
    emoji: '🖥️',
    data: {
      ...defaultPostData,
      userName: 'Jessica Williams',
      timestamp: 'November 5, 2014 at 2:15 PM',
      postContent: 'Excited to announce I\'m running the NYC Marathon next month! 🏃‍♀️ If anyone wants to sponsor me, link is in the comments. Every dollar counts! 💙\n\n#NYCMarathon #Running #Charity #MakeADifference',
      attachedImage: '',
      likes: 73,
      comments: 18,
      shares: 6,
      topLikerName: 'Sarah Miller',
      showCommentPreview: true,
      showNavBar: true,
      showSidebars: true,
      showPeopleAlsoLike: true,
      commentsList: [
        { id: '1', commenterName: 'David Park', commenterAvatar: defaultAvatar, commentText: 'You got this! I\'ll sponsor you for sure 💪', commentTimestamp: '1 hr', commentLikes: 7, replies: [] },
        { id: '2', commenterName: 'Emma Thompson', commenterAvatar: defaultAvatar, commentText: 'That\'s amazing! What charity are you running for?', commentTimestamp: '50 min', commentLikes: 2, replies: [] },
      ],
      highlightHashtags: true,
      location: 'Central Park, New York',
      feeling: 'feeling excited',
      showMoreStories: true,
    },
  },
  {
    name: 'Viral Post',
    emoji: '🔥',
    data: {
      ...defaultPostData,
      userName: 'Viral Content Hub',
      timestamp: 'August 20, 2014 at 11:32 AM',
      postContent: 'I just found out that the average person walks the equivalent of 5 times around the earth in their lifetime. Mind = blown. 🤯🌍\n\nShare this if you had no idea!\n\n#MindBlown #Facts #DidYouKnow',
      likes: 5234,
      comments: 892,
      shares: 1247,
      topLikerName: 'BuzzFeed',
      showCommentPreview: true,
      showNavBar: true,
      showSidebars: true,
      showPeopleAlsoLike: true,
      commentsList: [
        { id: '1', commenterName: 'Jake Thompson', commenterAvatar: defaultAvatar, commentText: 'Wait what?! That\'s insane 😱', commentTimestamp: '2 hrs', commentLikes: 156, replies: [] },
        { id: '2', commenterName: 'Samantha Reed', commenterAvatar: defaultAvatar, commentText: 'I walked 10 miles today and I\'m exhausted. Can\'t imagine 5x around the earth lmao', commentTimestamp: '1 hr', commentLikes: 89, replies: [] },
        { id: '3', commenterName: 'Mike Anderson', commenterAvatar: defaultAvatar, commentText: 'Shared! My friends need to see this 🔥', commentTimestamp: '45 min', commentLikes: 34, replies: [] },
      ],
      highlightHashtags: true,
      showMoreStories: true,
    },
  },
  {
    name: 'Life Event',
    emoji: '🎓',
    data: {
      ...defaultPostData,
      userName: 'Sarah Mitchell',
      timestamp: 'May 25, 2014 at 10:00 AM',
      postContent: 'After 4 years of late nights, endless coffee, and incredible friends... I did it! 🎓✨',
      postType: 'lifeevent',
      lifeEventCategory: 'Graduated from',
      lifeEventDate: 'May 2014',
      lifeEventDescription: 'Stanford University — B.S. Computer Science',
      likes: 342,
      comments: 56,
      shares: 12,
      topLikerName: 'Mom',
      feeling: 'feeling accomplished',
      highlightHashtags: true,
    },
  },
  {
    name: 'Group Discussion',
    emoji: '👥',
    data: {
      ...defaultPostData,
      userName: 'David Chen',
      timestamp: 'July 15, 2014 at 3:22 PM',
      postContent: 'Has anyone tried the new ramen place on University Ave? Heard great things but haven\'t been yet. Thoughts? 🍜',
      groupPostName: 'Bay Area Foodies',
      groupPostAvatar: defaultAvatar,
      likes: 23,
      comments: 14,
      shares: 1,
      topLikerName: 'Amy Chen',
      showCommentPreview: true,
      commentsList: [
        { id: '1', commenterName: 'Lisa Wang', commenterAvatar: defaultAvatar, commentText: 'YES! Their tonkotsu is amazing 🍜', commentTimestamp: '1 hr', commentLikes: 8, replies: [
          { id: 'r1', name: 'David Chen', avatar: defaultAvatar, text: 'Oh nice! What\'s the best thing to order?', timestamp: '45 min' },
        ] },
        { id: '2', commenterName: 'Mike T.', commenterAvatar: defaultAvatar, commentText: 'The wait can be long though. Go before 6pm on weekdays.', commentTimestamp: '30 min', commentLikes: 5, replies: [] },
      ],
    },
  },
]

// ──────────── Helpers ────────────

function formatEngagement(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

function renderTextWithHashtags(text: string, highlight: boolean): React.ReactNode {
  if (!highlight) return text
  const parts = text.split(/(#\w+)/g)
  return parts.map((part, i) => {
    if (part.startsWith('#')) {
      return <span key={i} style={{ color: '#3b5998', fontWeight: 700 }}>{part}</span>
    }
    return part
  })
}

function getPostBgColor(bg: PostBackgroundOption): string {
  switch (bg) {
    case 'cream': return '#fdf6e3'
    case 'light-blue': return '#e8f0fe'
    case 'light-green': return '#e6f4ea'
    case 'light-yellow': return '#fef7e0'
    case 'light-pink': return '#fce4ec'
    default: return '#ffffff'
  }
}

function getCommentSortLabel(order: CommentSortOrder): string {
  switch (order) {
    case 'top': return 'Top Comments'
    case 'newest': return 'Newest Comments'
    case 'all': return 'All Comments'
    default: return 'Most Relevant'
  }
}

function getEngagementVisibilityLabel(vis: EngagementVisibility): string {
  switch (vis) {
    case 'public': return 'Public'
    case 'friends': return 'Friends'
    case 'custom': return '3 people'
    default: return 'Public'
  }
}

function getFontFamily(font: string): string {
  const opt = fontFamilyOptions.find(f => f.value === font)
  return opt ? opt.family : "'Helvetica Neue', Helvetica, Arial, sans-serif"
}

const TRUNCATE_LENGTH = 280

// ──────────── PostCard with animation wrapper ────────────

function PostCardWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{
      opacity: mounted ? 1 : 0.92,
      transform: mounted ? 'translateY(0)' : 'translateY(2px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.6s ease',
      boxShadow: mounted
        ? '0 1px 2px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.04)'
        : '0 1px 2px rgba(0,0,0,0.06), 0 0 3px rgba(0,0,0,0.02)',
    }}>
      {children}
    </div>
  )
}

// ──────────── Update Status Composer Bar ────────────

function UpdateStatusComposer({ userName, profilePicture }: { userName: string; profilePicture: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #dddfe2',
      borderRadius: '5px',
      padding: '8px 10px',
      marginBottom: '10px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '36px', height: '36px', minWidth: '36px',
          borderRadius: '2px', overflow: 'hidden',
          border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
        }}>
          <img src={profilePicture || defaultAvatar} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
        <div style={{
          flex: 1, backgroundColor: '#f0f2f5', borderRadius: '18px',
          padding: '8px 12px', fontSize: '13px', color: '#9197a3',
          cursor: 'text', border: '1px solid #dddfe2',
        }}>
          What&apos;s on your mind, {userName || 'User'}?
        </div>
      </div>
      <div style={{
        borderTop: '1px solid #e5e5e5',
        marginTop: '8px',
        paddingTop: '6px',
        display: 'flex',
        gap: '4px',
      }}>
        {[
          { label: 'Photo', icon: <PhotoSmallIcon size={14} color="#5a7fb5" /> },
          { label: 'Video', icon: <VideoSmallIcon size={14} color="#5a7fb5" /> },
          { label: 'Event', icon: <EventSmallIcon size={14} color="#5a7fb5" /> },
        ].map(item => (
          <div key={item.label} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '4px', padding: '4px 0', cursor: 'pointer',
            borderRight: item.label !== 'Event' ? '1px solid #e5e5e5' : 'none',
          }}>
            {item.icon}
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#5a7fb5' }}>{item.label}</span>
          </div>
        ))}
        <div style={{
          padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#5a7fb5' }}>Write Post</span>
        </div>
      </div>
    </div>
  )
}

// ──────────── Create Post Mini Box ────────────

function CreatePostMiniBox({ userName, profilePicture }: { userName: string; profilePicture: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #dddfe2',
      borderRadius: '3px',
      height: '38px',
      marginBottom: '12px',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <div style={{
        width: '32px', height: '32px', minWidth: '32px',
        borderRadius: '50%', overflow: 'hidden',
        border: '1px solid #dddfe2', backgroundColor: '#e9eaed',
      }}>
        <img src={profilePicture || defaultAvatar} alt="" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} />
      </div>
      <div style={{
        flex: 1, fontSize: '12px', color: '#9197a3',
      }}>
        What&apos;s on your mind?
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
          <PhotoSmallIcon size={14} color="#5a7fb5" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
          <VideoSmallIcon size={14} color="#5a7fb5" />
        </div>
      </div>
    </div>
  )
}

// ──────────── Facebook Navigation Bar ────────────

function FacebookNavBar({ userName, profilePicture }: { userName: string; profilePicture: string }) {
  return (
    <div style={{
      backgroundColor: '#3b5998',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      height: '43px',
      gap: '0',
    }}>
      {/* Left: f logo + facebook wordmark + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{
          width: '22px', height: '22px', backgroundColor: '#ffffff',
          borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '14px', fontWeight: 800, color: '#3b5998', lineHeight: 1,
          }}>f</span>
        </div>
        <span style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '15px', fontWeight: 700, fontStyle: 'italic', color: '#ffffff',
          letterSpacing: '-0.3px', lineHeight: 1,
        }}>facebook</span>
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '2px',
          padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px',
          minWidth: '170px', maxWidth: '200px',
        }}>
          <svg viewBox="0 0 20 20" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="#9197a3" strokeWidth="1.8"/>
            <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#9197a3" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '11px', color: '#9197a3', whiteSpace: 'nowrap' }}>Search</span>
        </div>
      </div>

      {/* Center: nav links */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0',
      }}>
        {[
          { label: 'Home', active: true },
          { label: 'Profile', active: false },
          { label: 'Friends', active: false },
          { label: 'Messages', active: false },
        ].map(item => (
          <div key={item.label} style={{
            padding: '6px 12px', fontSize: '12px', fontWeight: 700,
            color: item.active ? '#ffffff' : '#d8dfea', cursor: 'pointer',
            borderBottom: item.active ? '2px solid #ffffff' : '2px solid transparent',
            letterSpacing: '0.01em', whiteSpace: 'nowrap',
          }}>
            {item.label}
          </div>
        ))}
      </div>

      {/* Right: user info */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
      }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '2px',
          overflow: 'hidden', border: '1px solid #2d4373',
        }}>
          <img src={profilePicture || defaultAvatar} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
        <span style={{
          fontSize: '12px', fontWeight: 700, color: '#ffffff', cursor: 'pointer',
          maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {userName}
        </span>
        <div style={{
          width: '24px', height: '24px', backgroundColor: '#4e69a2', borderRadius: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg viewBox="0 0 20 20" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5h16M2 10h16M2 15h16" stroke="#d8dfea" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        {/* Bell icon with notification badge + pulse animation */}
        <div style={{
          position: 'relative',
          width: '24px', height: '24px', backgroundColor: '#4e69a2', borderRadius: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg viewBox="0 0 20 20" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a7 7 0 100 14 7 7 0 000-14z" fill="none" stroke="#d8dfea" strokeWidth="2"/>
            <path d="M10 6v5M10 13h.01" fill="none" stroke="#d8dfea" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {/* Red notification badge with pulse */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '13px',
            height: '13px',
            minWidth: '13px',
            borderRadius: '50%',
            backgroundColor: '#e74c3c',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            border: '1.5px solid #3b5998',
            animation: 'fbBadgePulse 2s ease-in-out infinite',
          }}>
            3
          </div>
          <style>{`
            @keyframes fbBadgePulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
              50% { box-shadow: 0 0 0 4px rgba(231, 76, 60, 0); }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

// ──────────── Facebook Left Sidebar ────────────

function FacebookLeftSidebar({ userName, profilePicture }: { userName: string; profilePicture: string }) {
  const navSectionStyle: React.CSSProperties = {
    padding: '6px 0',
    borderBottom: '1px solid #e5e5e5',
  }
  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#9197a3',
    textTransform: 'uppercase', padding: '6px 10px 3px 10px',
    letterSpacing: '0.03em',
  }
  const smallIcon = (
    <span style={{
      display: 'inline-block', width: '16px', height: '16px', borderRadius: '2px',
      backgroundColor: '#3b5998', marginRight: '6px', verticalAlign: 'middle',
      textAlign: 'center', lineHeight: '16px', fontSize: '9px', color: '#fff', fontWeight: 700,
    }}>&#8203;</span>
  )

  const [showMoreFavourites, setShowMoreFavourites] = React.useState(false)

  return (
    <div style={{
      width: '220px', minWidth: '220px', backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e5e5', fontSize: '12px',
      alignSelf: 'flex-start',
    }}>
      {/* User profile card */}
      <div style={{
        padding: '10px', borderBottom: '1px solid #e5e5e5',
        display: 'flex', gap: '8px', alignItems: 'flex-start',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '2px', overflow: 'hidden',
          border: '1px solid #e5e5e5', flexShrink: 0,
        }}>
          <img src={profilePicture || defaultAvatar} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b5998', lineHeight: '15px' }}>
            {userName}
          </div>
          <div style={{ fontSize: '11px', color: '#9197a3', lineHeight: '14px', marginTop: '1px' }}>
            Living the dream ✨
          </div>
          <div style={{ fontSize: '11px', color: '#3b5998', marginTop: '2px', cursor: 'pointer' }}>
            Friends · Photos
          </div>
        </div>
      </div>

      {/* Favourites */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Favourites</div>
        {['News Feed', 'Messages', 'Events', 'Photos', 'Friends'].map((item, i) => {
          const isHidden = !showMoreFavourites && i >= 3
          return (
            <div key={item} style={{
              fontSize: '12px', color: '#1d2129', padding: '2px 10px', cursor: 'pointer',
              display: isHidden ? 'none' : 'block', textDecoration: 'none',
              backgroundColor: i === 0 ? '#e7f3ff' : 'transparent',
              fontWeight: i === 0 ? 600 : 400,
              borderRadius: '2px',
            }}>
              {smallIcon}
              {item}
            </div>
          )
        })}
        <div style={{
          fontSize: '11px', color: '#3b5998', fontWeight: 600, cursor: 'pointer',
          padding: '4px 10px 2px 10px',
        }}
          onClick={() => setShowMoreFavourites(!showMoreFavourites)}>
          {showMoreFavourites ? '▲ See Less' : '▼ See More'}
        </div>
      </div>

      {/* Pages */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Pages</div>
        <div style={{ fontSize: '12px', color: '#1d2129', padding: '2px 10px', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
          {smallIcon}
          Create Page
        </div>
      </div>

      {/* Groups */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Groups</div>
        <div style={{ fontSize: '12px', color: '#1d2129', padding: '2px 10px', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
          {smallIcon}
          Create Group
        </div>
      </div>

      {/* Apps */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Apps</div>
        <div style={{ fontSize: '12px', color: '#1d2129', padding: '2px 10px', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
          {smallIcon}
          Find Friends
        </div>
        <div style={{ fontSize: '12px', color: '#9197a3', padding: '2px 10px', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
          {smallIcon}
          On This Day
        </div>
      </div>

      {/* Birthdays */}
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{
          fontSize: '11px', color: '#3b5998', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <CakeIcon size={12} color="#3b5998" />
          2 friends have birthdays today
        </div>
      </div>

      {/* Friends Online */}
      <div style={{ padding: '6px 0 8px 0' }}>
        <div style={sectionHeaderStyle}>Friends Online</div>
        {friendOnlineData.map((friend) => (
          <div key={friend.name} style={{
            padding: '2px 10px', display: 'flex', alignItems: 'center', gap: '6px',
            cursor: 'pointer',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden',
              border: '1px solid #e5e5e5', backgroundColor: '#e9eaed', position: 'relative',
            }}>
              <img src={defaultAvatar} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }} />
              {/* Online indicator */}
              <div style={{
                position: 'absolute', bottom: '-1px', right: '-1px',
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: '#4caf50', border: '1.5px solid #ffffff',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', color: '#1d2129', lineHeight: '15px' }}>
                {friend.name}
              </div>
              {friend.status && (
                <div style={{ fontSize: '10px', color: '#9197a3', lineHeight: '13px' }}>
                  {friend.status}
                </div>
              )}
            </div>
          </div>
        ))}
        {/* See All / See More */}
        <div style={{ fontSize: '11px', color: '#3b5998', fontWeight: 600, cursor: 'pointer', padding: '4px 10px 0 10px' }}>
          See All
        </div>
      </div>

      {/* Create Ad */}
      <div style={{ padding: '4px 10px 8px 10px' }}>
        <div style={{ fontSize: '11px', color: '#3b5998', fontWeight: 600, cursor: 'pointer' }}>
          Create Ad
        </div>
      </div>
    </div>
  )
}

// ──────────── Facebook Right Sidebar ────────────

function FacebookRightSidebar() {
  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#9197a3',
    textTransform: 'uppercase', padding: '6px 10px 4px 10px',
    letterSpacing: '0.03em',
  }

  return (
    <div style={{
      width: '249px', minWidth: '249px', backgroundColor: '#ffffff',
      borderLeft: '1px solid #e5e5e5', fontSize: '12px',
      alignSelf: 'flex-start',
    }}>
      {/* Sponsored — improved */}
      <div style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div style={{
          ...sectionHeaderStyle,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingRight: '10px',
        }}>
          Sponsored
          <CloseXIcon size={10} color="#bcc0c4" />
        </div>
        <div style={{
          margin: '4px 10px 8px 10px', padding: '0',
          backgroundColor: '#f0f2f5', border: '1px solid #dddfe2', borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '8px 10px 6px 10px',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              backgroundColor: '#dddfe2', overflow: 'hidden', flexShrink: 0,
            }}>
              <img src={defaultAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#1d2129', lineHeight: '13px' }}>
                  TrendyApp
                </div>
                <div style={{
                  fontSize: '9px', color: '#3b5998', cursor: 'pointer', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '2px',
                }}>
                  <span>Sponsored</span>
                  <svg viewBox="0 0 10 10" width="6" height="6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4l2 2 2-2" fill="none" stroke="#3b5998" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '9px', color: '#9197a3', lineHeight: '12px' }}>
                Ad · example.com
              </div>
            </div>
          </div>
          <div style={{
            height: '80px', backgroundColor: '#e5e5e5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', color: '#9197a3' }}>Ad Content</span>
          </div>
        </div>
        <div style={{ padding: '4px 10px 6px 10px' }}>
          <div style={{ fontSize: '9px', color: '#9197a3', display: 'flex', gap: '4px' }}>
            <span style={{ cursor: 'pointer' }}>Why am I seeing this?</span>
          </div>
        </div>
      </div>

      {/* People You May Know */}
      <div style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div style={sectionHeaderStyle}>People You May Know</div>
        {[
          { name: 'Emily Davis', mutFriends: 12 },
          { name: 'Jason Park', mutFriends: 8 },
          { name: 'Rachel Kim', mutFriends: 5 },
        ].map((person) => (
          <div key={person.name} style={{
            padding: '6px 10px',
            display: 'flex', gap: '8px', alignItems: 'center',
            borderBottom: '1px solid #f0f2f5',
            backgroundColor: '#ffffff',
            transition: 'background-color 0.15s ease',
          }}>
            <div style={{
              width: '32px', height: '32px', minWidth: '32px',
              borderRadius: '50%', overflow: 'hidden', border: '1px solid #dddfe2',
              backgroundColor: '#e9eaed',
            }}>
              <img src={defaultAvatar} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d2129', lineHeight: '14px' }}>
                {person.name}
              </div>
              <div style={{ fontSize: '10px', color: '#9197a3', lineHeight: '13px' }}>
                {person.mutFriends} mutual friends
              </div>
            </div>
            <div style={{
              fontSize: '11px', color: '#ffffff', backgroundColor: '#4267B2',
              padding: '3px 8px', borderRadius: '2px', cursor: 'pointer', fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              Add Friend
            </div>
          </div>
        ))}
        <div style={{
          padding: '2px 10px 8px 10px',
          fontSize: '11px', color: '#3b5998', cursor: 'pointer', fontWeight: 600,
        }}>
          See All
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding: '0 0 8px 0' }}>
        <div style={sectionHeaderStyle}>Trending</div>
        {[
          { topic: '#IceBucketChallenge', posts: '2.1M posts' },
          { topic: 'World Cup 2014', posts: '890K posts' },
          { topic: 'New York Fashion Week', posts: '456K posts' },
          { topic: 'Breaking Bad Finale', posts: '1.2M posts' },
        ].map((trend) => (
          <div key={trend.topic} style={{ padding: '4px 10px', cursor: 'pointer' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1d2129' }}>
              {trend.topic}
            </div>
            <div style={{ fontSize: '10px', color: '#9197a3' }}>
              {trend.posts}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──────────── Preview Component ────────────

interface FBPostPreviewProps {
  data: FBPostData
}

export const FBPostPreview = forwardRef<HTMLDivElement, FBPostPreviewProps>(
  function FBPostPreview({ data }, ref) {
    const {
      profilePicture, userName, timestamp, postContent, attachedImage,
      sharedLink, linkTitle, linkDomain, linkDescription, linkImage,
      visibility, likes, comments, shares, topLikerName,
      showCommentPreview, commentsList, showNavBar, highlightHashtags, truncateLongPosts,
      showSidebars, showWatermark, showPeopleAlsoLike,
      taggedFriends, location, feeling, showMoreStories, borderRadius, postBackground,
      sharedByText, isEdited, engagementVisibility, commentSortOrder,
      groupPostName, groupPostAvatar,
      postType, lifeEventCategory, lifeEventDate, lifeEventDescription, postFontFamily,
    } = data

    const hasEngagement = likes > 0 || comments > 0 || shares > 0
    const hasLikes = likes > 0
    const hasComments = comments > 0
    const hasShares = shares > 0
    const hasContent = !!(postContent || attachedImage || sharedLink)
    const showBothSidebars = showNavBar && showSidebars

    const visibilityLabel = visibility === 'public' ? 'Public' : visibility === 'friends' ? 'Friends' : 'Only Me'
    const VisibilityIcon = visibility === 'public' ? GlobeIcon : visibility === 'friends' ? FriendsIcon : LockIcon

    const shouldTruncate = !!(truncateLongPosts && postContent && postContent.length > TRUNCATE_LENGTH)
    const [expanded, setExpanded] = useState(false)
    const displayContent = shouldTruncate && !expanded
      ? postContent.slice(0, TRUNCATE_LENGTH) + '...'
      : postContent

    return (
      <div
        ref={ref}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
          backgroundColor: '#e9eaed',
          padding: '0',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ─── Facebook Nav Bar ─── */}
        {showNavBar && <FacebookNavBar userName={userName} profilePicture={profilePicture} />}

        {/* ─── Blue accent bar below nav ─── */}
        {showNavBar && (
          <div style={{ width: '100%', height: '2px', backgroundColor: '#4e69a2' }} />
        )}

        {/* ─── Main content area ─── */}
        {showBothSidebars ? (
          <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
            <FacebookLeftSidebar userName={userName} profilePicture={profilePicture} />
            <div style={{ flex: 1, maxWidth: '500px', minWidth: '0' }}>
              <div style={{ padding: '10px' }}>
                {showMoreStories && <UpdateStatusComposer userName={userName} profilePicture={profilePicture} />}
                <CreatePostMiniBox userName={userName} profilePicture={profilePicture} />
                <PostCard
                  profilePicture={profilePicture} userName={userName} timestamp={timestamp}
                  postContent={postContent} attachedImage={attachedImage}
                  sharedLink={sharedLink} linkTitle={linkTitle} linkDomain={linkDomain}
                  linkDescription={linkDescription} linkImage={linkImage}
                  visibility={visibility} visibilityLabel={visibilityLabel} VisibilityIcon={VisibilityIcon}
                  likes={likes} comments={comments} shares={shares} topLikerName={topLikerName}
                  hasEngagement={hasEngagement} hasLikes={hasLikes} hasComments={hasComments} hasShares={hasShares}
                  hasContent={hasContent}
                  showCommentPreview={showCommentPreview} commentsList={commentsList}
                  highlightHashtags={highlightHashtags}
                  truncateLongPosts={truncateLongPosts} shouldTruncate={shouldTruncate}
                  displayContent={displayContent} expanded={expanded} setExpanded={setExpanded}
                  showPeopleAlsoLike={showPeopleAlsoLike} showWatermark={showWatermark}
                  taggedFriends={taggedFriends} location={location} feeling={feeling}
                  borderRadius={borderRadius} postBackground={postBackground}
                  sharedByText={sharedByText} isEdited={isEdited}
                  engagementVisibility={engagementVisibility} commentSortOrder={commentSortOrder}
                  groupPostName={groupPostName} groupPostAvatar={groupPostAvatar}
                  postType={postType} lifeEventCategory={lifeEventCategory}
                  lifeEventDate={lifeEventDate} lifeEventDescription={lifeEventDescription}
                  postFontFamily={postFontFamily}
                />
                {showMoreStories && <MoreStoriesSection />}
                <FacebookFooter />
              </div>
            </div>
            <FacebookRightSidebar />
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: showNavBar ? '500px' : '100%', padding: '0' }}>
            {showNavBar && <UpdateStatusComposer userName={userName} profilePicture={profilePicture} />}
            {showNavBar && <CreatePostMiniBox userName={userName} profilePicture={profilePicture} />}
            <div style={{ padding: showNavBar ? '0' : '0' }}>
              <PostCard
                profilePicture={profilePicture} userName={userName} timestamp={timestamp}
                postContent={postContent} attachedImage={attachedImage}
                sharedLink={sharedLink} linkTitle={linkTitle} linkDomain={linkDomain}
                linkDescription={linkDescription} linkImage={linkImage}
                visibility={visibility} visibilityLabel={visibilityLabel} VisibilityIcon={VisibilityIcon}
                likes={likes} comments={comments} shares={shares} topLikerName={topLikerName}
                hasEngagement={hasEngagement} hasLikes={hasLikes} hasComments={hasComments} hasShares={hasShares}
                hasContent={hasContent}
                showCommentPreview={showCommentPreview} commentsList={commentsList}
                highlightHashtags={highlightHashtags}
                truncateLongPosts={truncateLongPosts} shouldTruncate={shouldTruncate}
                displayContent={displayContent} expanded={expanded} setExpanded={setExpanded}
                showPeopleAlsoLike={showPeopleAlsoLike} showWatermark={showWatermark}
                taggedFriends={taggedFriends} location={location} feeling={feeling}
                borderRadius={borderRadius} postBackground={postBackground}
                sharedByText={sharedByText} isEdited={isEdited}
                engagementVisibility={engagementVisibility} commentSortOrder={commentSortOrder}
                groupPostName={groupPostName} groupPostAvatar={groupPostAvatar}
                postType={postType} lifeEventCategory={lifeEventCategory}
                lifeEventDate={lifeEventDate} lifeEventDescription={lifeEventDescription}
                postFontFamily={postFontFamily}
              />
            </div>
            {showNavBar && showMoreStories && <MoreStoriesSection />}
            {showNavBar && <FacebookFooter />}
          </div>
        )}
      </div>
    )
  }
)

// ──────────── More Stories Section ────────────

function MoreStoriesSection() {
  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{
        fontSize: '11px', fontWeight: 700, color: '#9197a3',
        textTransform: 'uppercase', padding: '6px 0 4px 0',
        letterSpacing: '0.03em',
      }}>
        More Stories
      </div>
      {moreStoriesData.map((story) => (
        <div key={story.name} style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dddfe2',
          borderTop: '2px solid #e5e5e5',
          borderRadius: '3px',
          padding: '8px 10px',
          marginBottom: '8px',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: '32px', height: '32px', minWidth: '32px',
            borderRadius: '2px', overflow: 'hidden',
            border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
          }}>
            <img src={story.avatar} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b5998', lineHeight: '15px' }}>
              {story.name}
            </div>
            <div style={{
              fontSize: '11px', color: '#6d7380', lineHeight: '15px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {story.text}
            </div>
            <div style={{ fontSize: '10px', color: '#9197a3', marginTop: '2px' }}>
              {story.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ──────────── Facebook Footer ────────────

function FacebookFooter() {
  return (
    <div style={{
      padding: '10px 12px',
      fontSize: '11px',
      color: '#9197a3',
      borderTop: '1px solid #e5e5e5',
      marginTop: '10px',
    }}>
      Facebook © 2014 · English (US) · Privacy · Terms · Cookies · Advertising · Help
    </div>
  )
}

// ──────────── Post Card Component ────────────

function PostCard({
  profilePicture, userName, timestamp, postContent, attachedImage,
  sharedLink, linkTitle, linkDomain, linkDescription, linkImage,
  visibility, visibilityLabel, VisibilityIcon,
  likes, comments, shares, topLikerName,
  hasEngagement, hasLikes, hasComments, hasShares, hasContent,
  showCommentPreview, commentsList, highlightHashtags,
  truncateLongPosts, shouldTruncate, displayContent, expanded, setExpanded,
  showPeopleAlsoLike, showWatermark,
  taggedFriends, location, feeling, borderRadius, postBackground,
  sharedByText, isEdited, engagementVisibility, commentSortOrder,
  groupPostName, groupPostAvatar,
  postType, lifeEventCategory, lifeEventDate, lifeEventDescription, postFontFamily,
}: {
  profilePicture: string
  userName: string
  timestamp: string
  postContent: string
  attachedImage: string
  sharedLink: boolean
  linkTitle: string
  linkDomain: string
  linkDescription: string
  linkImage: string
  visibility: VisibilityOption
  visibilityLabel: string
  VisibilityIcon: React.FC<{ size?: number; color?: string }>
  likes: number
  comments: number
  shares: number
  topLikerName: string
  hasEngagement: boolean
  hasLikes: boolean
  hasComments: boolean
  hasShares: boolean
  hasContent: boolean
  showCommentPreview: boolean
  commentsList: CommentData[]
  highlightHashtags: boolean
  truncateLongPosts: boolean
  shouldTruncate: boolean
  displayContent: string
  expanded: boolean
  setExpanded: (v: boolean) => void
  showPeopleAlsoLike: boolean
  showWatermark: boolean
  taggedFriends: string[]
  location: string
  feeling: string
  borderRadius: number
  postBackground: PostBackgroundOption
  sharedByText: string
  isEdited: boolean
  engagementVisibility: EngagementVisibility
  commentSortOrder: CommentSortOrder
  groupPostName: string
  groupPostAvatar: string
  postType: 'default' | 'lifeevent'
  lifeEventCategory: string
  lifeEventDate: string
  lifeEventDescription: string
  postFontFamily: string
}) {
  const bgColor = getPostBgColor(postBackground)
  const br = borderRadius || 3
  const contentFontFamily = getFontFamily(postFontFamily)

  return (
    <PostCardWrapper>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #dddfe2',
        borderTop: '2px solid #e5e5e5',
        borderRadius: `${br}px`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        background: postBackground === 'white'
          ? 'linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%)'
          : bgColor,
        position: 'relative',
      }}>
        {/* ─── Group Post Header ─── */}
        {groupPostName && (
          <div style={{
            backgroundColor: '#f0f2f5',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid #dddfe2',
            fontSize: '12px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '4px',
              overflow: 'hidden', border: '1px solid #dddfe2', backgroundColor: '#e9eaed', flexShrink: 0,
            }}>
              <img src={groupPostAvatar || defaultAvatar} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              }} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#1d2129', fontWeight: 700 }}>
                {groupPostName}
              </div>
              <div style={{ fontSize: '10px', color: '#9197a3', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FriendsIcon size={10} color="#9197a3" />
                <span>Group · 45K members</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Life Event Banner ─── */}
        {postType === 'lifeevent' && (
          <div style={{
            backgroundColor: '#4267B2',
            padding: '12px 12px 14px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarIcon size={16} color="#ffffff" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Life Event</span>
            </div>
            {lifeEventCategory && (
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', paddingLeft: '22px' }}>
                {lifeEventCategory}
              </div>
            )}
            {lifeEventDate && (
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', paddingLeft: '22px' }}>
                {lifeEventDate}
              </div>
            )}
            {lifeEventDescription && (
              <div style={{ fontSize: '13px', color: '#ffffff', paddingLeft: '22px', marginTop: '2px' }}>
                {lifeEventDescription}
              </div>
            )}
          </div>
        )}

        {/* ─── Shared By Banner ─── */}
        {sharedByText && (
          <div style={{
            backgroundColor: '#f0f2f5',
            padding: '7px 12px 8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            borderBottom: '1px solid #dddfe2',
            fontSize: '11px',
            color: '#6d7380',
          }}>
            <SmallGlobeIcon size={11} color="#6d7380" />
            <span style={{ fontWeight: 600, color: '#6d7380' }}>{sharedByText}</span>
            <span>shared a link</span>
          </div>
        )}

        {/* ─── Header: Avatar + Name + Timestamp + ... ─── */}
        <div style={{
          padding: '10px 12px 8px 12px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '7px',
        }}>
          <div style={{
            width: '40px', height: '40px', minWidth: '40px',
            borderRadius: '2px', overflow: 'hidden',
            border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
          }}>
            <img src={profilePicture || defaultAvatar} alt="Profile" style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#3b5998',
              lineHeight: '17px', cursor: 'pointer', wordBreak: 'break-word',
            }}>
              {userName || 'Your Name'}
            </div>
            <div style={{
              fontSize: '11px', color: '#9197a3', lineHeight: '14px',
              marginTop: '1px', display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <span>{timestamp || 'Just now'}</span>
              {isEdited && (
                <span style={{ fontSize: '10px', color: '#9197a3' }}>· Edited</span>
              )}
              <span style={{ fontSize: '9px' }}>·</span>
              <VisibilityIcon size={11} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#9197a3' }}>
                {visibilityLabel}
              </span>
            </div>
          </div>
          {/* Post options "..." indicator — smaller, more spaced */}
          <div style={{
            padding: '2px 4px', cursor: 'pointer', borderRadius: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DownDotsIcon size={14} color="#9197a3" />
          </div>
        </div>

        {/* ─── Feeling / Activity ─── */}
        {feeling && (
          <div style={{
            padding: '2px 12px 4px 60px',
            fontSize: '13px', lineHeight: '18px', color: '#6d7380',
            fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <SmileyIcon size={14} color="#9197a3" />
            <span>{userName || 'Your Name'} is {feeling}</span>
            <span style={{ color: '#9197a3' }}>·</span>
          </div>
        )}

        {/* ─── Location / Check-in ─── */}
        {location && (
          <div style={{
            padding: feeling ? '0 12px 4px 60px' : '2px 12px 4px 60px',
            fontSize: '12px', lineHeight: '16px', color: '#9197a3',
            display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer',
          }}>
            <PinIcon size={12} color="#9197a3" />
            <span style={{ color: '#3b5998', fontWeight: 600 }}>{location}</span>
          </div>
        )}

        {/* ─── Post Content ─── */}
        {postContent && (
          <div style={{
            padding: attachedImage || sharedLink ? '6px 12px 8px 12px' : '6px 12px 8px 60px',
            fontSize: '14px', lineHeight: '1.42', color: '#1d2129',
            wordBreak: 'break-word', whiteSpace: 'pre-wrap',
            fontFamily: contentFontFamily,
            letterSpacing: '0.01em',
          }}>
            {renderTextWithHashtags(displayContent, highlightHashtags)}
            {shouldTruncate && (
              <span
                style={{ color: '#3b5998', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? ' See Less' : 'See More'}
              </span>
            )}
            {/* Tagged Friends */}
            {taggedFriends && taggedFriends.length > 0 && (
              <div style={{ marginTop: '2px', lineHeight: '18px' }}>
                <span style={{ color: '#6d7380' }}>with </span>
                {taggedFriends.map((friend, i) => (
                  <span key={i}>
                    <span style={{ color: '#3b5998', fontWeight: 600, cursor: 'pointer' }}>{friend}</span>
                    {i < taggedFriends.length - 1 && <span style={{ color: '#6d7380' }}>, </span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Attached Image ─── */}
        {attachedImage && (
          <div style={{ margin: '0 10px 6px 10px' }}>
            <div style={{
              backgroundColor: '#e5e5e5', borderRadius: `${Math.min(br, 3)}px`,
              overflow: 'hidden', border: '1px solid #dddfe2',
            }}>
              <img src={attachedImage} alt="Post attachment" style={{
                width: '100%', display: 'block', maxHeight: '500px',
                objectFit: 'contain', backgroundColor: '#e5e5e5',
              }} />
            </div>
          </div>
        )}

        {/* ─── Shared Link Preview ─── */}
        {sharedLink && (
          <div style={{ margin: '4px 10px 6px 10px' }}>
            <div style={{
              border: '1px solid #dddfe2', borderRadius: '3px',
              overflow: 'hidden', cursor: 'pointer',
            }}>
              {linkImage && (
                <div style={{
                  backgroundColor: '#e5e5e5', height: '150px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <img src={linkImage} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} />
                  {/* Subtle gradient overlay for text readability */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '50px',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              )}
              {!linkImage && (
                <div style={{
                  backgroundColor: '#f0f2f5', height: '130px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '4px', position: 'relative',
                }}>
                  <PlayButtonIcon size={36} />
                </div>
              )}
              {/* Thin separator line between image and text */}
              <div style={{ height: '1px', backgroundColor: '#e5e5e5' }} />
              <div style={{ padding: '10px 12px', backgroundColor: '#f7f7f7' }}>
                <div style={{
                  fontSize: '13px', fontWeight: 600, color: '#1d2129',
                  lineHeight: '17px', marginBottom: '2px',
                }}>
                  {linkTitle || 'Link Title'}
                </div>
                <div style={{
                  fontSize: '10px', color: '#9197a3', lineHeight: '15px',
                  marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.02em',
                }}>
                  {linkDomain || 'EXAMPLE.COM'}
                </div>
                <div style={{
                  fontSize: '12px', color: '#6d7380', lineHeight: '16px',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {linkDescription || 'Description of the shared link goes here.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── People Also Like ─── */}
        {showPeopleAlsoLike && likes > 10 && (
          <div style={{
            margin: '4px 10px 6px 10px',
            borderTop: '1px solid #e5e5e5',
            paddingTop: '8px',
          }}>
            <div style={{
              fontSize: '11px', fontWeight: 600, color: '#9197a3',
              marginBottom: '6px',
            }}>
              People Also Like
            </div>
            <div style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              {[
                { name: 'Emily Davis' },
                { name: 'Jason Park' },
                { name: 'Rachel Kim' },
              ].map((person) => (
                <div key={person.name} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    overflow: 'hidden', border: '2px solid #3b5998',
                    backgroundColor: '#e9eaed',
                  }}>
                    <img src={defaultAvatar} alt="" style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                    }} />
                  </div>
                  <span style={{
                    fontSize: '11px', color: '#3b5998', fontWeight: 600,
                    textAlign: 'center', maxWidth: '70px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {person.name}
                  </span>
                </div>
              ))}
              <div style={{
                fontSize: '11px', color: '#3b5998', cursor: 'pointer',
                fontWeight: 600, alignSelf: 'center', marginLeft: '4px',
              }}>
                See More
              </div>
            </div>
          </div>
        )}

        {/* ─── Engagement Stats (improved with larger circles) ─── */}
        {hasEngagement && (
          <div style={{
            padding: '8px 12px 4px 12px',
            borderTop: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'linear-gradient(180deg, #f7f8fa 0%, #f0f2f5 100%)',
          }}>
            {/* Reaction mini circles — 20x20 instead of 18x18 */}
            {hasLikes && (
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '2px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: '#3b5998', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid #ffffff', zIndex: 3,
                  marginLeft: '0',
                }}>
                  <FilledThumbsUp size={11} />
                </div>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid #ffffff', zIndex: 2,
                  marginLeft: '-5px',
                }}>
                  <MiniFilledHeart size={10} />
                </div>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: '#f7b928', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid #ffffff', zIndex: 1,
                  marginLeft: '-5px',
                }}>
                  <MiniHahaFace size={10} />
                </div>
              </div>
            )}
            <span style={{ fontSize: '12px', color: '#6d7380', fontWeight: 600 }}>
              {topLikerName && hasLikes
                ? `Liked by ${topLikerName} and ${likes > 1 ? formatEngagement(likes - 1) : ''} others`
                : hasLikes
                  ? formatEngagement(likes)
                  : ''
              }
            </span>
            {/* Comments & shares + engagement visibility icon */}
            {(hasComments || hasShares) && (
              <span style={{ fontSize: '12px', color: '#6d7380' }}>
                {(topLikerName && hasLikes) && ' · '}
                {hasComments && `${formatEngagement(comments)} comments`}
                {hasComments && hasShares && ' · '}
                {hasShares && `${formatEngagement(shares)} shares`}
              </span>
            )}
            {/* Engagement visibility icon */}
            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}>
              {engagementVisibility === 'public' ? (
                <SmallGlobeIcon size={10} color="#bcc0c4" />
              ) : engagementVisibility === 'friends' ? (
                <SmallLockIcon size={10} color="#bcc0c4" />
              ) : (
                <SmallLockIcon size={10} color="#bcc0c4" />
              )}
              <span style={{ fontSize: '10px', color: '#bcc0c4' }}>{getEngagementVisibilityLabel(engagementVisibility)}</span>
            </div>
          </div>
        )}

        {/* ─── Engagement bottom border ─── */}
        {hasEngagement && (
          <div style={{
            height: '1px', backgroundColor: '#e5e5e5', margin: '0 12px',
          }} />
        )}

        {/* ─── Action Bar: Like · Comment · Share ─── */}
        <div style={{
          display: 'flex',
          borderTop: hasEngagement ? 'none' : '1px solid #e5e5e5',
          margin: '0',
          cursor: 'pointer',
        }}>
          {/* Like button with light blue gradient pill */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '4px', padding: '6px 0', fontSize: '12px', fontWeight: 700,
            color: '#7f7f7f',
            background: 'linear-gradient(180deg, #f0f3f8 0%, #e8ecf1 100%)',
            borderRight: '1px solid #e5e5e5',
            letterSpacing: '0.02em',
          }}>
            <div style={{
              borderRadius: '2px',
              padding: '1px 3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FilledThumbsUp size={12} />
            </div>
            <span>Like</span>
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '4px', padding: '6px 0', fontSize: '12px', fontWeight: 700,
            color: '#7f7f7f', borderRight: '1px solid #e5e5e5',
            letterSpacing: '0.02em',
          }}>
            <CommentBubbleIcon size={13} color="#7f7f7f" />
            <span>Comment</span>
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '4px', padding: '6px 0', fontSize: '12px', fontWeight: 700,
            color: '#7f7f7f',
            letterSpacing: '0.02em',
          }}>
            <ShareArrowIcon size={13} color="#7f7f7f" />
            <span>Share</span>
          </div>
        </div>

        {/* ─── Comment Preview Section ─── */}
        {showCommentPreview && commentsList.length > 0 && (
          <div style={{
            borderTop: '1px solid #e5e5e5',
            padding: '8px 12px 4px 12px',
          }}>
            {/* Comment sort dropdown label */}
            <div style={{
              fontSize: '10px', fontWeight: 600, color: '#9197a3',
              marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <span>{getCommentSortLabel(commentSortOrder)}</span>
              <svg viewBox="0 0 10 10" width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4l3 3 3-3" fill="none" stroke="#9197a3" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* "View all X comments" */}
            {comments > commentsList.length && (
              <div style={{
                fontSize: '12px', fontWeight: 600, color: '#3b5998',
                cursor: 'pointer', marginBottom: '6px',
              }}>
                View all {comments} comments
              </div>
            )}

            {/* Subtle gray line separator before first comment */}
            <div style={{
              height: '1px', backgroundColor: '#e5e5e5', marginBottom: '6px',
            }} />

            {commentsList.map((comment) => (
              <div key={comment.id} style={{
                backgroundColor: '#f7f7f7',
                borderRadius: '3px',
                padding: '6px 8px',
                marginBottom: '6px',
              }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px', height: '32px', minWidth: '32px',
                    borderRadius: '2px', overflow: 'hidden',
                    border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
                  }}>
                    <img src={comment.commenterAvatar || defaultAvatar} alt="" style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      backgroundColor: '#ebedf0',
                      borderRadius: '12px',
                      padding: '6px 10px',
                    }}>
                      <span style={{
                        fontSize: '12px', fontWeight: 700, color: '#3b5998',
                        lineHeight: '16px',
                      }}>
                        {comment.commenterName}
                      </span>
                      <span style={{
                        fontSize: '12px', color: '#1d2129',
                        lineHeight: '16px', marginLeft: '4px',
                      }}>
                        {comment.commentText}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      marginTop: '2px', paddingLeft: '4px',
                    }}>
                      {/* Like button — lighter weight */}
                      <span style={{ fontSize: '11px', fontWeight: 400, color: '#3b5998', cursor: 'pointer' }}>
                        Like
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 400, color: '#3b5998', cursor: 'pointer' }}>
                        Reply
                      </span>
                      <span style={{ fontSize: '11px', color: '#9197a3' }}>
                        {comment.commentTimestamp}
                      </span>
                      {comment.commentLikes > 0 && (
                        <span style={{
                          fontSize: '11px', color: '#9197a3',
                          display: 'flex', alignItems: 'center', gap: '2px',
                        }}>
                          <FilledThumbsUp size={10} />
                          {comment.commentLikes}
                        </span>
                      )}
                    </div>

                    {/* ─── Reply Threads ─── */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div style={{
                        marginTop: '4px',
                        marginLeft: '12px',
                        paddingLeft: '10px',
                        borderLeft: '2px solid #dddfe2',
                      }}>
                        {/* "X replies" link */}
                        <div style={{
                          fontSize: '11px', fontWeight: 600, color: '#3b5998',
                          cursor: 'pointer', marginBottom: '4px',
                        }}>
                          {comment.replies.length === 1 ? '1 reply' : `${comment.replies.length} replies`}
                        </div>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} style={{
                            display: 'flex',
                            gap: '6px',
                            alignItems: 'flex-start',
                            marginBottom: '4px',
                          }}>
                            <div style={{
                              width: '24px', height: '24px', minWidth: '24px',
                              borderRadius: '50%', overflow: 'hidden',
                              border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
                            }}>
                              <img src={reply.avatar || defaultAvatar} alt="" style={{
                                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                              }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ lineHeight: '16px' }}>
                                <span style={{
                                  fontSize: '12px', fontWeight: 700, color: '#3b5998',
                                }}>
                                  {reply.name}
                                </span>
                                <span style={{
                                  fontSize: '12px', color: '#1d2129',
                                  marginLeft: '4px',
                                }}>
                                  {reply.text}
                                </span>
                              </div>
                              <div style={{
                                fontSize: '11px', color: '#9197a3',
                                marginTop: '1px',
                              }}>
                                {reply.timestamp}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Write a Comment Input (improved with camera + icons) ─── */}
        <div style={{
          borderTop: showCommentPreview ? 'none' : '1px solid #e5e5e5',
          padding: '10px 12px 8px 12px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '32px', height: '32px', minWidth: '32px',
              borderRadius: '50%', overflow: 'hidden',
              border: '1px solid #dddfe2', backgroundColor: '#e9eaed',
            }}>
              <img src={profilePicture || defaultAvatar} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              }} />
            </div>
            <div style={{
              flex: 1, backgroundColor: '#f0f2f5', borderRadius: '18px',
              padding: '7px 12px', fontSize: '13px', color: '#9197a3',
              border: '1px solid #dddfe2',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span>Write a comment...</span>
            </div>
            {/* Small camera icon */}
            <div style={{
              width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', borderRadius: '4px',
            }}>
              <svg viewBox="0 0 20 20" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h3l2-2h6v12H4V6zm2 1v8h8V6h-4.5L7.5 8H6v-1z" fill="#9197a3" stroke="none"/>
                <circle cx="10" cy="11" r="2.5" fill="none" stroke="#9197a3" strokeWidth="1.2"/>
              </svg>
            </div>
          </div>
          {/* Small attachment icons row below comment input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '6px',
            paddingLeft: '40px',
          }}>
            {/* Attachment/paperclip icon */}
            <svg viewBox="0 0 20 20" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', opacity: 0.6 }}>
              <path d="M13.5 6.5v7a4 4 0 01-8 0V5a2.5 2.5 0 015 0v8.5a1 1 0 01-2 0V5.5" fill="none" stroke="#9197a3" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {/* Poll/chart icon */}
            <svg viewBox="0 0 20 20" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', opacity: 0.6 }}>
              <rect x="3" y="11" width="3" height="5" rx="0.5" fill="#9197a3"/>
              <rect x="8.5" y="8" width="3" height="8" rx="0.5" fill="#9197a3"/>
              <rect x="14" y="4" width="3" height="12" rx="0.5" fill="#9197a3"/>
            </svg>
            {/* Emoji/smile icon */}
            <svg viewBox="0 0 20 20" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', opacity: 0.6 }}>
              <circle cx="10" cy="10" r="7" fill="none" stroke="#9197a3" strokeWidth="1.3"/>
              <circle cx="7.5" cy="8.5" r="1" fill="#9197a3"/>
              <circle cx="12.5" cy="8.5" r="1" fill="#9197a3"/>
              <path d="M7 12c0 0 1.5 2 3 2s3-2 3-2" fill="none" stroke="#9197a3" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* ─── Watermark ─── */}
        {showWatermark && (
          <div style={{
            position: 'absolute', bottom: '50px', right: '12px',
            fontSize: '10px', color: '#999999', fontStyle: 'italic',
          }}>
            Generated with 2014 FB Post Generator
          </div>
        )}
      </div>
    </PostCardWrapper>
  )
}
