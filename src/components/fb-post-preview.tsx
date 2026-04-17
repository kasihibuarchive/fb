'use client'

import { forwardRef } from 'react'

// Classic 2014 Facebook Thumbs Up Icon (inline SVG for html2canvas compatibility)
function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path d="M8.5 2.5c0-0.276 0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5v3.5h3.5c0.276 0 0.5 0.224 0.5 0.5v7c0 0.276-0.224 0.5-0.5 0.5h-5.5v-11.5z" fill="#3b5998"/>
        <path d="M8.5 5v8h-6c-0.276 0-0.5-0.224-0.5-0.5v-7c0-0.276 0.224-0.5 0.5-0.5h6z" fill="#3b5998"/>
      </g>
    </svg>
  )
}

// 2014 Facebook Thumbs Up - filled blue
function FilledThumbsUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.25 2.12c-.14-.14-.36-.04-.36.16v2.72h-5c-.41 0-.75.34-.75.75v6c0 .41.34.75.75.75h6.75c.41 0 .75-.34.75-.75V6.25c0-.2-.08-.39-.22-.53L9.25 2.12z" fill="#3b5998"/>
      <path d="M8.39 5v8H2.5c-.41 0-.75-.34-.75-.75v-6.5c0-.41.34-.75.75-.75h5.89z" fill="#3b5998"/>
    </svg>
  )
}

// Globe icon for public posts
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="8" cy="8" rx="3" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1"/>
      <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1"/>
      <path d="M2.5 5.5h11" fill="none" stroke="currentColor" strokeWidth="0.8"/>
      <path d="M2.5 10.5h11" fill="none" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
  )
}

// Comment icon
function CommentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L8.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

// Share icon
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4.5l-3 3L9 10.5M12 13H5.5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2H12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export interface FBPostData {
  profilePicture: string
  userName: string
  timestamp: string
  postContent: string
  attachedImage: string
  likes: number
  comments: number
  shares: number
}

const defaultAvatar = '/fb-default-avatar.svg'

export const defaultPostData: FBPostData = {
  profilePicture: defaultAvatar,
  userName: 'John Doe',
  timestamp: 'October 12, 2014 at 4:30 PM',
  postContent: 'Just had the most amazing coffee at this little café downtown. The latte art was incredible! ☕ Sometimes it\'s the simple things that make your day. #blessed',
  attachedImage: '',
  likes: 42,
  comments: 8,
  shares: 3,
}

interface FBPostPreviewProps {
  data: FBPostData
}

export const FBPostPreview = forwardRef<HTMLDivElement, FBPostPreviewProps>(
  function FBPostPreview({ data }, ref) {
    const { profilePicture, userName, timestamp, postContent, attachedImage, likes, comments, shares } = data

    const formatEngagement = (count: number) => {
      if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
      if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
      return count.toString()
    }

    const hasEngagement = likes > 0 || comments > 0 || shares > 0
    const hasLikes = likes > 0
    const hasComments = comments > 0
    const hasShares = shares > 0

    return (
      <div
        ref={ref}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
          backgroundColor: '#e9eaed',
          padding: '20px',
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '500px',
            maxWidth: '100%',
          }}
        >
          {/* Post Container */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '2px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Header: Avatar + Name + Timestamp */}
            <div
              style={{
                padding: '12px 12px 8px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              {/* Avatar - Square with slight rounding (2014 style) */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid #ddd',
                  backgroundColor: '#e9eaed',
                }}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="Default avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                )}
              </div>

              {/* Name + Timestamp */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#3b5998',
                    lineHeight: '16px',
                    cursor: 'pointer',
                    wordBreak: 'break-word',
                  }}
                >
                  {userName || 'Your Name'}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#9197a3',
                    lineHeight: '14px',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{timestamp || 'Just now'}</span>
                  <span style={{ color: '#9197a3', fontSize: '10px' }}>·</span>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <GlobeIcon />
                  </span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            {(postContent || attachedImage) && (
              <div
                style={{
                  padding: attachedImage ? '4px 12px 8px 12px' : '0 12px 12px 60px',
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: '#1d2129',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {postContent || 'What\'s on your mind?'}
              </div>
            )}

            {/* Attached Image */}
            {attachedImage && (
              <div
                style={{
                  margin: '0 12px 8px 12px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  backgroundColor: '#000',
                }}
              >
                <img
                  src={attachedImage}
                  alt="Post attachment"
                  style={{
                    width: '100%',
                    display: 'block',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    backgroundColor: '#000',
                  }}
                />
              </div>
            )}

            {/* Engagement Stats */}
            {hasEngagement && (
              <div
                style={{
                  padding: '6px 12px',
                  margin: '0 12px',
                  borderTop: '1px solid #e5e5e5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6d7380',
                }}
              >
                {/* Likes count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {hasLikes && (
                    <>
                      <FilledThumbsUp className="" />
                      <span style={{ fontWeight: 500 }}>
                        {formatEngagement(likes)}
                      </span>
                    </>
                  )}
                </div>

                {/* Comments & Shares */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  {hasComments && (
                    <span style={{ cursor: 'pointer' }}>
                      {formatEngagement(comments)} Comments
                    </span>
                  )}
                  {hasShares && (
                    <span style={{ cursor: 'pointer' }}>
                      {formatEngagement(shares)} Shares
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Divider line */}
            <div
              style={{
                margin: hasEngagement ? '0 12px' : '0 12px',
                borderTop: '1px solid #e5e5e5',
              }}
            />

            {/* Action Bar: Like | Comment | Share */}
            <div
              style={{
                display: 'flex',
                padding: '2px 12px 4px 12px',
                margin: '0 0 0 0',
              }}
            >
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#7f7f7f',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  letterSpacing: '0.02em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f2f5'
                  e.currentTarget.style.color = '#4b4f56'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#7f7f7f'
                }}
              >
                <ThumbsUpIcon className="" />
                Like
              </button>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#7f7f7f',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  letterSpacing: '0.02em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f2f5'
                  e.currentTarget.style.color = '#4b4f56'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#7f7f7f'
                }}
              >
                <CommentIcon className="" />
                Comment
              </button>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#7f7f7f',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  letterSpacing: '0.02em',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f2f5'
                  e.currentTarget.style.color = '#4b4f56'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#7f7f7f'
                }}
              >
                <ShareIcon className="" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
