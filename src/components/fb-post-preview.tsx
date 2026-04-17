'use client'

import type React from 'react'
import { useState, forwardRef } from 'react'

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

// ──────────── Types & Defaults ────────────

export type VisibilityOption = 'public' | 'friends' | 'onlyme'

export interface CommentData {
  id: string
  commenterName: string
  commenterAvatar: string
  commentText: string
  commentTimestamp: string
  commentLikes: number
}

export interface FBPostData {
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
}

const defaultAvatar = '/fb-default-avatar.svg'

export const defaultComment: CommentData = {
  id: '1',
  commenterName: 'Mike Johnson',
  commenterAvatar: defaultAvatar,
  commentText: 'This looks amazing! Where is this place?',
  commentTimestamp: '2 hrs',
  commentLikes: 3,
}

export const defaultPostData: FBPostData = {
  profilePicture: defaultAvatar,
  userName: 'John Doe',
  timestamp: 'October 12, 2014 at 4:30 PM',
  postContent: 'Just had the most amazing coffee at this little café downtown. The latte art was incredible! ☕ Sometimes it\'s the simple things that make your day. #blessed',
  attachedImage: '',
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
}

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
        { id: '1', commenterName: 'Alex Turner', commenterAvatar: defaultAvatar, commentText: 'So jealous! I need a morning like that 😭', commentTimestamp: '3 hrs', commentLikes: 5 },
        { id: '2', commenterName: 'Rachel Kim', commenterAvatar: defaultAvatar, commentText: 'Where is this café?? It looks gorgeous!', commentTimestamp: '2 hrs', commentLikes: 2 },
      ],
      highlightHashtags: true,
      truncateLongPosts: false,
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
        { id: '1', commenterName: 'Jessica Brown', commenterAvatar: defaultAvatar, commentText: 'Aww happy birthday to your sister!! 🎉🎉🎉', commentTimestamp: '1 hr', commentLikes: 8 },
        { id: '2', commenterName: 'Tom Richards', commenterAvatar: defaultAvatar, commentText: 'Happy birthday! Hope she has the best day ever 🥳', commentTimestamp: '45 min', commentLikes: 1 },
        { id: '3', commenterName: 'Lisa Chen', commenterAvatar: defaultAvatar, commentText: 'Such a sweet post! 🥰', commentTimestamp: '30 min', commentLikes: 3 },
      ],
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
        { id: '1', commenterName: 'Sam Lee', commenterAvatar: defaultAvatar, commentText: 'The 6 Plus is too big IMO. 6 is perfect!', commentTimestamp: '45 min', commentLikes: 12 },
        { id: '2', commenterName: 'Nina Patel', commenterAvatar: defaultAvatar, commentText: 'I just pre-ordered the 6 Plus. Can\'t wait! 📱', commentTimestamp: '30 min', commentLikes: 4 },
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
        { id: '1', commenterName: 'Linda Johnson', commenterAvatar: defaultAvatar, commentText: 'SO PROUD OF YOU!!! We always knew you could do it! ❤️❤️❤️', commentTimestamp: '30 min', commentLikes: 45 },
        { id: '2', commenterName: 'Dad', commenterAvatar: defaultAvatar, commentText: 'Well done son! You earned this. 💪', commentTimestamp: '25 min', commentLikes: 22 },
      ],
      highlightHashtags: true,
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
        { id: '1', commenterName: 'Ashley Williams', commenterAvatar: defaultAvatar, commentText: 'HAHAHA I remember this! So funny 😂😂', commentTimestamp: '5 hrs', commentLikes: 34 },
        { id: '2', commenterName: 'Ryan Martinez', commenterAvatar: defaultAvatar, commentText: 'The outfit though!! 🔥🔥', commentTimestamp: '4 hrs', commentLikes: 19 },
        { id: '3', commenterName: 'Jessica Nguyen', commenterAvatar: defaultAvatar, commentText: 'We were so young! Miss those days 🥺', commentTimestamp: '3 hrs', commentLikes: 11 },
      ],
      highlightHashtags: true,
      truncateLongPosts: false,
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
        { id: '1', commenterName: 'David Park', commenterAvatar: defaultAvatar, commentText: 'You got this! I\'ll sponsor you for sure 💪', commentTimestamp: '1 hr', commentLikes: 7 },
        { id: '2', commenterName: 'Emma Thompson', commenterAvatar: defaultAvatar, commentText: 'That\'s amazing! What charity are you running for?', commentTimestamp: '50 min', commentLikes: 2 },
      ],
      highlightHashtags: true,
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
        { id: '1', commenterName: 'Jake Thompson', commenterAvatar: defaultAvatar, commentText: 'Wait what?! That\'s insane 😱', commentTimestamp: '2 hrs', commentLikes: 156 },
        { id: '2', commenterName: 'Samantha Reed', commenterAvatar: defaultAvatar, commentText: 'I walked 10 miles today and I\'m exhausted. Can\'t imagine 5x around the earth lmao', commentTimestamp: '1 hr', commentLikes: 89 },
        { id: '3', commenterName: 'Mike Anderson', commenterAvatar: defaultAvatar, commentText: 'Shared! My friends need to see this 🔥', commentTimestamp: '45 min', commentLikes: 34 },
      ],
      highlightHashtags: true,
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
      return <span key={i} style={{ color: '#3b5998', fontWeight: 600 }}>{part}</span>
    }
    return part
  })
}

const TRUNCATE_LENGTH = 280

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
        <div style={{
          width: '24px', height: '24px', backgroundColor: '#4e69a2', borderRadius: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg viewBox="0 0 20 20" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a7 7 0 100 14 7 7 0 000-14z" fill="none" stroke="#d8dfea" strokeWidth="2"/>
            <path d="M10 6v5M10 13h.01" fill="none" stroke="#d8dfea" strokeWidth="2" strokeLinecap="round"/>
          </svg>
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
  const navItemStyle: React.CSSProperties = {
    fontSize: '12px', color: '#1d2129', padding: '2px 10px', cursor: 'pointer',
    display: 'block', textDecoration: 'none',
  }
  const smallIcon = (
    <span style={{
      display: 'inline-block', width: '16px', height: '16px', borderRadius: '2px',
      backgroundColor: '#3b5998', marginRight: '6px', verticalAlign: 'middle',
      textAlign: 'center', lineHeight: '16px', fontSize: '9px', color: '#fff', fontWeight: 700,
    }}>&#8203;</span>
  )

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
        {['News Feed', 'Messages', 'Events', 'Photos', 'Friends'].map((item, i) => (
          <div key={item} style={{
            ...navItemStyle,
            backgroundColor: i === 0 ? '#e7f3ff' : 'transparent',
            fontWeight: i === 0 ? 600 : 400,
            borderRadius: '2px',
          }}>
            {smallIcon}
            {item}
          </div>
        ))}
      </div>

      {/* Pages */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Pages</div>
        <div style={navItemStyle}>
          {smallIcon}
          Create Page
        </div>
      </div>

      {/* Groups */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Groups</div>
        <div style={navItemStyle}>
          {smallIcon}
          Create Group
        </div>
      </div>

      {/* Apps */}
      <div style={navSectionStyle}>
        <div style={sectionHeaderStyle}>Apps</div>
        <div style={navItemStyle}>
          {smallIcon}
          Find Friends
        </div>
        <div style={{ ...navItemStyle, color: '#9197a3' }}>
          {smallIcon}
          On This Day
        </div>
      </div>

      {/* Friends Online */}
      <div style={{ padding: '6px 0 8px 0' }}>
        <div style={sectionHeaderStyle}>Friends Online</div>
        {['Amy Chen', 'Brian K.', 'Maria S.'].map((name, i) => (
          <div key={name} style={{
            padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              backgroundColor: '#dddfe2', overflow: 'hidden', flexShrink: 0,
              position: 'relative',
            }}>
              <img src={defaultAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', bottom: '-1px', right: '-1px',
                width: '7px', height: '7px', borderRadius: '50%',
                backgroundColor: '#47b63a', border: '1px solid #fff',
              }} />
            </div>
            <span style={{ fontSize: '11px', color: '#1d2129' }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Create Ad */}
      <div style={{ padding: '6px 10px 10px 10px', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ fontSize: '10px', color: '#3b5998', cursor: 'pointer' }}>
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
      {/* Sponsored */}
      <div style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div style={sectionHeaderStyle}>Sponsored</div>
        <div style={{
          margin: '4px 10px 8px 10px', padding: '8px',
          backgroundColor: '#f0f2f5', border: '1px solid #dddfe2', borderRadius: '3px',
          height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '12px', color: '#9197a3', fontWeight: 600 }}>Ad</span>
        </div>
      </div>

      {/* People You May Know */}
      <div style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div style={sectionHeaderStyle}>People You May Know</div>
        {[
          { name: 'Olivia Martin', mutFriends: 5 },
          { name: 'James Wilson', mutFriends: 3 },
          { name: 'Sophia Lee', mutFriends: 8 },
        ].map((person) => (
          <div key={person.name} style={{
            padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '2px',
              overflow: 'hidden', flexShrink: 0, backgroundColor: '#dddfe2',
            }}>
              <img src={defaultAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '12px', fontWeight: 600, color: '#3b5998',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {person.name}
              </div>
              <div style={{ fontSize: '10px', color: '#9197a3' }}>
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
          /* ── 3-column layout with sidebars ── */
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            padding: '0',
            minHeight: '400px',
          }}>
            <FacebookLeftSidebar userName={userName} profilePicture={profilePicture} />

            {/* ── Center Feed ── */}
            <div style={{
              flex: 1,
              maxWidth: '500px',
              minWidth: '300px',
              padding: '12px 0 24px 0',
            }}>
              <PostCard
                profilePicture={profilePicture}
                userName={userName}
                timestamp={timestamp}
                postContent={postContent}
                attachedImage={attachedImage}
                sharedLink={sharedLink}
                linkTitle={linkTitle}
                linkDomain={linkDomain}
                linkDescription={linkDescription}
                linkImage={linkImage}
                visibility={visibility}
                visibilityLabel={visibilityLabel}
                VisibilityIcon={VisibilityIcon}
                likes={likes}
                comments={comments}
                shares={shares}
                topLikerName={topLikerName}
                hasEngagement={hasEngagement}
                hasLikes={hasLikes}
                hasComments={hasComments}
                hasShares={hasShares}
                hasContent={hasContent}
                showCommentPreview={showCommentPreview}
                commentsList={commentsList}
                highlightHashtags={highlightHashtags}
                truncateLongPosts={truncateLongPosts}
                shouldTruncate={shouldTruncate}
                displayContent={displayContent}
                expanded={expanded}
                setExpanded={setExpanded}
                showPeopleAlsoLike={showPeopleAlsoLike}
                showWatermark={showWatermark}
              />
            </div>

            <FacebookRightSidebar />
          </div>
        ) : (
          /* ── Normal single-column feed ── */
          <div style={{
            width: '500px',
            maxWidth: '100%',
            padding: showNavBar ? '12px 0 24px 0' : '24px 20px',
          }}>
            <PostCard
              profilePicture={profilePicture}
              userName={userName}
              timestamp={timestamp}
              postContent={postContent}
              attachedImage={attachedImage}
              sharedLink={sharedLink}
              linkTitle={linkTitle}
              linkDomain={linkDomain}
              linkDescription={linkDescription}
              linkImage={linkImage}
              visibility={visibility}
              visibilityLabel={visibilityLabel}
              VisibilityIcon={VisibilityIcon}
              likes={likes}
              comments={comments}
              shares={shares}
              topLikerName={topLikerName}
              hasEngagement={hasEngagement}
              hasLikes={hasLikes}
              hasComments={hasComments}
              hasShares={hasShares}
              hasContent={hasContent}
              showCommentPreview={showCommentPreview}
              commentsList={commentsList}
              highlightHashtags={highlightHashtags}
              truncateLongPosts={truncateLongPosts}
              shouldTruncate={shouldTruncate}
              displayContent={displayContent}
              expanded={expanded}
              setExpanded={setExpanded}
              showPeopleAlsoLike={showPeopleAlsoLike}
              showWatermark={showWatermark}
            />
          </div>
        )}

        {/* ─── FB Footer ─── */}
        {showNavBar && (
          <div style={{
            width: '100%', backgroundColor: '#e9eaed',
            borderTop: '1px solid #dddfe2',
            padding: '12px 20px', textAlign: 'center',
            fontSize: '11px', color: '#9197a3',
          }}>
            Facebook &copy; 2014 &middot; English (US) &middot; Privacy &middot; Terms &middot; Cookies &middot; Advertising &middot; Help
          </div>
        )}
      </div>
    )
  }
)

// ──────────── Post Card (extracted for reuse) ────────────

function PostCard({
  profilePicture, userName, timestamp, postContent, attachedImage,
  sharedLink, linkTitle, linkDomain, linkDescription, linkImage,
  visibility, visibilityLabel, VisibilityIcon,
  likes, comments, shares, topLikerName,
  hasEngagement, hasLikes, hasComments, hasShares, hasContent,
  showCommentPreview, commentsList, highlightHashtags,
  truncateLongPosts, shouldTruncate, displayContent, expanded, setExpanded,
  showPeopleAlsoLike, showWatermark,
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
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #dddfe2',
      borderRadius: '3px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%)',
      position: 'relative',
    }}>
      {/* ─── Header: Avatar + Name + Timestamp ─── */}
      <div style={{
        padding: '10px 12px 6px 12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
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
            <span style={{ fontSize: '9px' }}>·</span>
            <VisibilityIcon size={11} />
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#9197a3' }}>
              {visibilityLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Post Content ─── */}
      {postContent && (
        <div style={{
          padding: attachedImage || sharedLink ? '4px 12px 8px 12px' : '4px 12px 8px 60px',
          fontSize: '14px', lineHeight: '19px', color: '#1d2129',
          wordBreak: 'break-word', whiteSpace: 'pre-wrap',
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
        </div>
      )}

      {/* ─── Attached Image ─── */}
      {attachedImage && (
        <div style={{ margin: '0 10px 6px 10px' }}>
          <div style={{
            backgroundColor: '#e5e5e5', borderRadius: '3px',
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
                borderBottom: '1px solid #dddfe2',
              }}>
                <img src={linkImage} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              </div>
            )}
            {!linkImage && (
              <div style={{
                backgroundColor: '#f0f2f5', height: '130px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid #dddfe2', flexDirection: 'column', gap: '4px',
              }}>
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6V8H5V19H16V14H18V20C18 20.6 17.6 21 17 21H4C3.4 21 3 20.6 3 20V7C3 6.4 3.4 6 4 6H10ZM21 3V11H19V6.4L13.4 12L12 10.6L17.6 5H13V3H21Z" fill="#9197a3"/>
                </svg>
                <span style={{ color: '#9197a3', fontSize: '12px' }}>Link Preview</span>
              </div>
            )}
            <div style={{ padding: '10px 12px', backgroundColor: '#f7f7f7' }}>
              <div style={{
                fontSize: '13px', fontWeight: 600, color: '#1d2129',
                lineHeight: '17px', marginBottom: '2px',
              }}>
                {linkTitle || 'Link Title'}
              </div>
              <div style={{
                fontSize: '11px', color: '#9197a3', lineHeight: '15px',
                marginBottom: '2px', textTransform: 'uppercase',
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
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                width: '52px',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  overflow: 'hidden', backgroundColor: '#dddfe2',
                  border: '1px solid #e5e5e5',
                }}>
                  <img src={defaultAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{
                  fontSize: '10px', color: '#3b5998', textAlign: 'center',
                  fontWeight: 600, lineHeight: '12px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  maxWidth: '52px',
                }}>
                  {person.name}
                </div>
              </div>
            ))}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              width: '52px', justifyContent: 'flex-end', paddingBottom: '14px',
            }}>
              <div style={{
                fontSize: '10px', color: '#3b5998', cursor: 'pointer', fontWeight: 600,
              }}>
                See More
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Engagement Stats ─── */}
      {hasEngagement && (
        <div style={{
          padding: '7px 12px', margin: '0 10px',
          borderTop: '1px solid #e5e5e5',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '12px', color: '#6d7380',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {hasLikes && (
              <>
                <FilledThumbsUp size={12} />
                {topLikerName && likes > 1 && (
                  <span style={{ fontWeight: 500 }}>
                    {topLikerName} and {formatEngagement(likes - 1)} others
                  </span>
                )}
                {topLikerName && likes <= 1 && (
                  <span style={{ fontWeight: 500 }}>{topLikerName} likes this</span>
                )}
                {!topLikerName && (
                  <span style={{ fontWeight: 500 }}>{formatEngagement(likes)}</span>
                )}
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            {hasComments && (
              <span style={{ cursor: 'pointer', fontSize: '12px' }}>
                {formatEngagement(comments)} {comments === 1 ? 'comment' : 'comments'}
              </span>
            )}
            {hasShares && (
              <span style={{ cursor: 'pointer', fontSize: '12px' }}>
                {formatEngagement(shares)} {shares === 1 ? 'share' : 'shares'}
              </span>
            )}
          </div>
        </div>
      )}

      <div style={{ margin: '0 10px', borderTop: '1px solid #e5e5e5' }} />

      {/* ─── Action Bar ─── */}
      <div style={{ display: 'flex', padding: '2px 8px 4px 8px' }}>
        {['Like', 'Comment', 'Share'].map(label => (
          <button key={label} style={actionButtonStyle} onMouseOver={actionHoverOn} onMouseOut={actionHoverOff}>
            {label === 'Like' && <ThumbsUpIcon size={13} color="#7f7f7f" />}
            {label === 'Comment' && <CommentBubbleIcon size={13} color="#7f7f7f" />}
            {label === 'Share' && <ShareArrowIcon size={13} color="#7f7f7f" />}
            {label}
          </button>
        ))}
      </div>

      {/* ─── Comment Section ─── */}
      {showCommentPreview && hasComments && commentsList.length > 0 && (
        <>
          <div style={{ margin: '0 10px', borderTop: '1px solid #e5e5e5' }} />
          <div style={{ padding: '8px 12px', backgroundColor: '#fafbfc' }}>
            {commentsList.map((c, idx) => (
              <div key={c.id} style={{
                display: 'flex', gap: '8px',
                marginBottom: idx < commentsList.length - 1 ? '8px' : '0',
              }}>
                <div style={{
                  width: '32px', height: '32px', minWidth: '32px',
                  borderRadius: '2px', overflow: 'hidden',
                  border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
                }}>
                  <img src={c.commenterAvatar || defaultAvatar} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'inline-block', backgroundColor: '#f0f2f5',
                    borderRadius: '12px', padding: '6px 10px', maxWidth: '100%',
                  }}>
                    <div style={{
                      fontSize: '12px', fontWeight: 700, color: '#3b5998',
                      lineHeight: '14px',
                    }}>
                      {c.commenterName || 'Commenter'}
                    </div>
                    <div style={{
                      fontSize: '12px', color: '#1d2129',
                      lineHeight: '16px', marginTop: '1px',
                    }}>
                      {c.commentText || 'Great post!'}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px', color: '#9197a3', marginTop: '2px',
                    paddingLeft: '10px', display: 'flex', gap: '10px', alignItems: 'center',
                  }}>
                    <span style={{ cursor: 'pointer', fontWeight: 600 }}>Like</span>
                    <span style={{ cursor: 'pointer' }}>Reply</span>
                    <span>{c.commentTimestamp || '2 hrs'}</span>
                    {c.commentLikes > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <span>·</span>
                        <FilledThumbsUp size={9} />
                        <span>{c.commentLikes}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* "See more comments" if comment count > commentsList length */}
            {comments > commentsList.length && (
              <div style={{
                fontSize: '12px', fontWeight: 600, color: '#3b5998',
                cursor: 'pointer', padding: '4px 0 4px 40px',
              }}>
                View all {comments} comments
              </div>
            )}

            {/* "Write a comment" input */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <div style={{
                width: '28px', height: '28px', minWidth: '28px',
                borderRadius: '2px', overflow: 'hidden',
                border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
              }}>
                <img src={profilePicture || defaultAvatar} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1, backgroundColor: '#ffffff', border: '1px solid #ccd0d5',
                borderRadius: '14px', padding: '6px 12px', fontSize: '12px',
                color: '#9197a3',
              }}>
                Write a comment...
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── "Write a comment" when no comment preview ─── */}
      {!showCommentPreview && hasContent && (
        <>
          <div style={{ margin: '0 10px', borderTop: '1px solid #e5e5e5' }} />
          <div style={{ padding: '8px 12px 10px 12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                width: '28px', height: '28px', minWidth: '28px',
                borderRadius: '2px', overflow: 'hidden',
                border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
              }}>
                <img src={profilePicture || defaultAvatar} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{
                flex: 1, backgroundColor: '#ffffff', border: '1px solid #ccd0d5',
                borderRadius: '14px', padding: '6px 12px', fontSize: '12px',
                color: '#9197a3',
              }}>
                Write a comment...
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Watermark ─── */}
      {showWatermark && (
        <div style={{
          padding: '8px 12px',
          textAlign: 'right',
          fontSize: '10px',
          color: '#999999',
          fontStyle: 'italic',
        }}>
          Generated with 2014 FB Post Generator
        </div>
      )}
    </div>
  )
}

// ──────────── Shared Styles ────────────

const actionButtonStyle: React.CSSProperties = {
  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  gap: '5px', padding: '6px 0', border: 'none', backgroundColor: 'transparent',
  color: '#7f7f7f', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
  borderRadius: '2px', letterSpacing: '0.01em', fontFamily: 'inherit',
}

function actionHoverOn(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.backgroundColor = '#f0f2f5'
  e.currentTarget.style.color = '#4b4f56'
}
function actionHoverOff(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.backgroundColor = 'transparent'
  e.currentTarget.style.color = '#7f7f7f'
}
