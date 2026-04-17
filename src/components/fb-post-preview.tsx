'use client'

import { forwardRef } from 'react'

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
  commentText: string
  commenterName: string
  commenterAvatar: string
  commentTimestamp: string
}

const defaultAvatar = '/fb-default-avatar.svg'

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
  commentText: 'This looks amazing! Where is this place?',
  commenterName: 'Mike Johnson',
  commenterAvatar: defaultAvatar,
  commentTimestamp: '2 hrs',
}

export const presets: { name: string; data: FBPostData }[] = [
  {
    name: '☀️ Coffee & Vibes',
    data: {
      ...defaultPostData,
      userName: 'Sarah Mitchell',
      timestamp: 'June 15, 2014 at 9:23 AM',
      postContent: 'Sunday morning coffee ritual ☕\n\nThere\'s something magical about slow mornings. No alarms, just the smell of fresh coffee and the sound of birds. This is what living feels like. ✨',
      attachedImage: '',
      likes: 127,
      comments: 24,
      shares: 5,
      topLikerName: 'Emily Davis',
      showCommentPreview: true,
      commentText: 'So jealous! I need a morning like that 😭',
      commenterName: 'Alex Turner',
      commentTimestamp: '3 hrs',
    },
  },
  {
    name: '🎉 Birthday Post',
    data: {
      ...defaultPostData,
      userName: 'Chris Parker',
      timestamp: 'March 8, 2014 at 12:00 PM',
      postContent: 'HAPPY BIRTHDAY to my amazing sister! 🎂🎈\n\nYou\'re not just my sister, you\'re my best friend. Here\'s to another year of adventures, laughter, and making memories together. Love you to the moon and back! 🌙💕',
      attachedImage: '',
      likes: 256,
      comments: 47,
      shares: 12,
      topLikerName: 'David Wilson',
      showCommentPreview: true,
      commentText: 'Aww happy birthday to your sister!! 🎉🎉',
      commenterName: 'Jessica Brown',
      commentTimestamp: '1 hr',
    },
  },
  {
    name: '📸 Shared Link',
    data: {
      ...defaultPostData,
      userName: 'Tech Enthusiast',
      timestamp: 'September 22, 2014 at 3:45 PM',
      postContent: 'This new iPhone 6 looks incredible! The bigger screen is exactly what we needed. Who else is pre-ordering? 📱',
      sharedLink: true,
      linkTitle: 'Apple Introduces iPhone 6 and iPhone 6 Plus',
      linkDomain: 'apple.com',
      linkDescription: 'Apple today announced iPhone 6 and iPhone 6 Plus, the biggest advancements in the history of iPhone, featuring new designs with bigger, thinner displays.',
      linkImage: '',
      attachedImage: '',
      likes: 89,
      comments: 31,
      shares: 15,
      topLikerName: 'Gadget Guru',
      showCommentPreview: true,
      commentText: 'The 6 Plus is too big IMO. 6 is perfect!',
      commenterName: 'Sam Lee',
      commentTimestamp: '45 min',
    },
  },
  {
    name: '🏆 Achievement Unlocked',
    data: {
      ...defaultPostData,
      userName: 'Marcus Johnson',
      timestamp: 'December 18, 2014 at 6:15 PM',
      postContent: '4 years of hard work and it finally happened... I got the promotion! 🎉🎉🎉\n\nThank you to everyone who believed in me, supported me through the late nights, and never let me give up. This one\'s for you. 💪\n\n#Blessed #Grateful #NewChapter',
      attachedImage: '',
      likes: 534,
      comments: 89,
      shares: 23,
      topLikerName: 'Mom',
      showCommentPreview: true,
      commentText: 'SO PROUD OF YOU!!! We always knew you could do it! ❤️❤️❤️',
      commenterName: 'Linda Johnson',
      commentTimestamp: '30 min',
    },
  },
]

// ──────────── Helper ────────────

function formatEngagement(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
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
      showCommentPreview, commentText, commenterName, commenterAvatar, commentTimestamp,
    } = data

    const hasEngagement = likes > 0 || comments > 0 || shares > 0
    const hasLikes = likes > 0
    const hasComments = comments > 0
    const hasShares = shares > 0
    const hasContent = postContent || attachedImage || sharedLink

    const visibilityLabel = visibility === 'public' ? 'Public' : visibility === 'friends' ? 'Friends' : 'Only Me'
    const VisibilityIcon = visibility === 'public' ? GlobeIcon : FriendsIcon

    return (
      <div
        ref={ref}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
          backgroundColor: '#e9eaed',
          padding: '24px 20px',
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '500px', maxWidth: '100%' }}>
          {/* ─── Post Container ─── */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dddfe2',
            borderRadius: '3px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}>
            {/* ─── Header: Avatar + Name + Timestamp ─── */}
            <div style={{
              padding: '10px 12px 6px 12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}>
              {/* Avatar */}
              <div style={{
                width: '40px', height: '40px', minWidth: '40px',
                borderRadius: '2px', overflow: 'hidden',
                border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
              }}>
                <img src={profilePicture || defaultAvatar} alt="Profile" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              {/* Name + Timestamp + Visibility */}
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
                padding: '4px 12px 8px 60px',
                fontSize: '14px', lineHeight: '19px', color: '#1d2129',
                wordBreak: 'break-word', whiteSpace: 'pre-wrap',
              }}>
                {postContent}
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
                      borderBottom: '1px solid #dddfe2',
                    }}>
                      <span style={{ color: '#8a8d91', fontSize: '13px' }}>🔗 Link Preview</span>
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
                      marginBottom: '2px',
                    }}>
                      {linkDomain ? linkDomain.toUpperCase() : 'EXAMPLE.COM'}
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

            {/* ─── Divider ─── */}
            <div style={{ margin: '0 10px', borderTop: '1px solid #e5e5e5' }} />

            {/* ─── Action Bar ─── */}
            <div style={{ display: 'flex', padding: '2px 8px 4px 8px' }}>
              <button style={actionButtonStyle} onMouseOver={actionHoverOn} onMouseOut={actionHoverOff}>
                <ThumbsUpIcon size={13} color="#7f7f7f" />
                Like
              </button>
              <button style={actionButtonStyle} onMouseOver={actionHoverOn} onMouseOut={actionHoverOff}>
                <CommentBubbleIcon size={13} color="#7f7f7f" />
                Comment
              </button>
              <button style={actionButtonStyle} onMouseOver={actionHoverOn} onMouseOut={actionHoverOff}>
                <ShareArrowIcon size={13} color="#7f7f7f" />
                Share
              </button>
            </div>

            {/* ─── Comment Preview ─── */}
            {showCommentPreview && hasComments && (
              <>
                <div style={{ margin: '0 10px', borderTop: '1px solid #e5e5e5' }} />
                <div style={{ padding: '8px 12px', backgroundColor: '#fafbfc' }}>
                  {/* Show 1-2 sample comments */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', minWidth: '32px',
                      borderRadius: '2px', overflow: 'hidden',
                      border: '1px solid #e5e5e5', backgroundColor: '#e9eaed',
                    }}>
                      <img src={commenterAvatar || defaultAvatar} alt="" style={{
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
                          {commenterName || 'Commenter'}
                        </div>
                        <div style={{
                          fontSize: '12px', color: '#1d2129',
                          lineHeight: '16px', marginTop: '1px',
                        }}>
                          {commentText || 'Great post!'}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '11px', color: '#9197a3', marginTop: '2px',
                        paddingLeft: '10px', display: 'flex', gap: '10px',
                      }}>
                        <span style={{ cursor: 'pointer', fontWeight: 600 }}>Like</span>
                        <span style={{ cursor: 'pointer' }}>Reply</span>
                        <span>{commentTimestamp || '2 hrs'}</span>
                      </div>
                    </div>
                  </div>

                  {/* "Write a comment" input */}
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
                      color: '#bcc0c4', cursor: 'text',
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
                      color: '#bcc0c4', cursor: 'text',
                    }}>
                      Write a comment...
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
)

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
