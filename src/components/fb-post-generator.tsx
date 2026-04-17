'use client'

import { useCallback, useRef, useState } from 'react'
import { FBPostPreview, type FBPostData, type VisibilityOption, type CommentData, type PostBackgroundOption, defaultPostData, defaultComment, presets, feelingOptions, postBackgroundOptions } from './fb-post-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ImagePlus, Download, User, Clock, Type, Heart, MessageSquare, Share2,
  X, Upload, Globe, Users, Lock, RotateCcw, Copy, ImageIcon, Link, MessageCircle,
  Sparkles, ChevronDown, ChevronUp, ExternalLink, FileImage, Monitor, Smartphone,
  Plus, Trash2, Hash, Scissors, Timer, Droplets, Columns3, UsersRound, Stamp,
  MapPin, SmilePlus, UserPlus, Layers, Palette, Minus
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const quickEmojis = ['😀','😂','😍','🥰','😎','🤔','😢','😡','👍','👎','❤️','🔥','🎉','💯','✨','🙏','💪','👀','🙏','😂','😍','🥺','🤣','😭']

const timestampPresets = [
  { label: 'Just now', value: 'Just now' },
  { label: '2 min', value: '2 minutes ago' },
  { label: '15 min', value: '15 minutes ago' },
  { label: '1 hr', value: 'About an hour ago' },
  { label: '2 hrs', value: '2 hours ago' },
  { label: '5 hrs', value: '5 hours ago' },
  { label: 'Yesterday', value: 'Yesterday at 9:30 PM' },
  { label: '2 days ago', value: '2 days ago at 3:15 PM' },
  { label: '1 week ago', value: '1 week ago at 11:00 AM' },
]

export default function FBPostGenerator() {
  const previewRef = useRef<HTMLDivElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const linkImageInputRef = useRef<HTMLInputElement>(null)
  const commenterAvatarInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const [postData, setPostData] = useState<FBPostData>(defaultPostData)
  const [isDownloading, setIsDownloading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    link: false,
    comment: false,
    advanced: false,
    taggedFriends: false,
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showTimestampPresets, setShowTimestampPresets] = useState(false)
  const [newFriendName, setNewFriendName] = useState('')
  const [customFeeling, setCustomFeeling] = useState('')
  const { toast } = useToast()

  const updateField = useCallback(<K extends keyof FBPostData>(field: K, value: FBPostData[K]) => {
    setPostData(prev => ({ ...prev, [field]: value }))
  }, [])

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const applyPreset = useCallback((data: FBPostData) => {
    setPostData(data)
    setExpandedSections({ link: data.sharedLink, comment: data.showCommentPreview, advanced: false, taggedFriends: false })
    toast({ title: 'Preset applied!', description: 'Post template loaded successfully.' })
  }, [toast])

  const resetAll = useCallback(() => {
    setPostData(defaultPostData)
    setExpandedSections({ link: false, comment: false, advanced: false, taggedFriends: false })
    setShowEmojiPicker(false)
    setShowTimestampPresets(false)
    setNewFriendName('')
    setCustomFeeling('')
    if (profileInputRef.current) profileInputRef.current.value = ''
    if (imageInputRef.current) imageInputRef.current.value = ''
    if (linkImageInputRef.current) linkImageInputRef.current.value = ''
    commenterAvatarInputRefs.current = {}
    toast({ title: 'Reset complete', description: 'All fields have been reset to defaults.' })
  }, [toast])

  // ── Upload handlers ──
  const handleProfileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('profilePicture', URL.createObjectURL(file))
  }, [updateField])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('attachedImage', URL.createObjectURL(file))
  }, [updateField])

  const handleLinkImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('linkImage', URL.createObjectURL(file))
  }, [updateField])

  const handleCommenterAvatarUpload = useCallback((id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPostData(prev => ({
        ...prev,
        commentsList: prev.commentsList.map(c =>
          c.id === id ? { ...c, commenterAvatar: URL.createObjectURL(file) } : c
        ),
      }))
    }
  }, [])

  const removeProfilePicture = useCallback(() => {
    updateField('profilePicture', '/fb-default-avatar.svg')
    if (profileInputRef.current) profileInputRef.current.value = ''
  }, [updateField])

  const removeAttachedImage = useCallback(() => {
    updateField('attachedImage', '')
    if (imageInputRef.current) imageInputRef.current.value = ''
  }, [updateField])

  const removeLinkImage = useCallback(() => {
    updateField('linkImage', '')
    if (linkImageInputRef.current) linkImageInputRef.current.value = ''
  }, [updateField])

  // ── Comment CRUD ──
  const addComment = useCallback(() => {
    const newComment: CommentData = {
      id: Date.now().toString(),
      commenterName: 'New Friend',
      commenterAvatar: '/fb-default-avatar.svg',
      commentText: 'This is awesome!',
      commentTimestamp: 'Just now',
      commentLikes: 0,
    }
    updateField('commentsList', [...postData.commentsList, newComment])
    if (!postData.showCommentPreview) updateField('showCommentPreview', true)
  }, [postData.commentsList, postData.showCommentPreview, updateField])

  const removeComment = useCallback((id: string) => {
    const newList = postData.commentsList.filter(c => c.id !== id)
    updateField('commentsList', newList)
    if (newList.length === 0) updateField('showCommentPreview', false)
  }, [postData.commentsList, updateField])

  const updateComment = useCallback((id: string, field: keyof CommentData, value: string | number) => {
    updateField('commentsList', postData.commentsList.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }, [postData.commentsList, updateField])

  // ── Tagged Friends ──
  const addTaggedFriend = useCallback(() => {
    const name = newFriendName.trim()
    if (name && !postData.taggedFriends.includes(name)) {
      updateField('taggedFriends', [...postData.taggedFriends, name])
      setNewFriendName('')
    }
  }, [newFriendName, postData.taggedFriends, updateField])

  const removeTaggedFriend = useCallback((name: string) => {
    updateField('taggedFriends', postData.taggedFriends.filter(f => f !== name))
  }, [postData.taggedFriends, updateField])

  // ── Timestamp preset ──
  const applyTimestampPreset = useCallback((value: string) => {
    updateField('timestamp', value)
    setShowTimestampPresets(false)
  }, [updateField])

  // ── Downloads ──
  const handleDownload = useCallback(async (format: 'png' | 'jpeg', scale: number) => {
    if (!previewRef.current || isDownloading) return
    setIsDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(previewRef.current, {
        scale, useCORS: true, allowTaint: true,
        backgroundColor: '#e9eaed', logging: false,
      })
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'
      const ext = format === 'jpeg' ? 'jpg' : 'png'
      const link = document.createElement('a')
      link.download = `facebook-post-2014-${Date.now()}.${ext}`
      link.href = canvas.toDataURL(mimeType, 0.95)
      link.click()
      toast({ title: 'Downloaded!', description: `${ext.toUpperCase()} at ${scale}x resolution` })
    } catch (err) {
      console.error('Failed to generate image:', err)
      toast({ title: 'Error', description: 'Failed to generate image.', variant: 'destructive' })
    } finally {
      setIsDownloading(false)
    }
  }, [isDownloading, toast])

  const handleCopyToClipboard = useCallback(async () => {
    if (!previewRef.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: '#e9eaed', logging: false,
      })
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            toast({ title: 'Copied!', description: 'Image copied to clipboard.' })
          } catch {
            toast({ title: 'Not supported', description: 'Clipboard API unavailable.', variant: 'destructive' })
          }
        }
      })
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [toast])

  // ── Emoji ──
  const insertEmoji = useCallback((emoji: string) => {
    updateField('postContent', postData.postContent + emoji)
    setShowEmojiPicker(false)
  }, [postData.postContent, updateField])

  const visibilityOptions: { value: VisibilityOption; label: string; icon: React.ReactNode }[] = [
    { value: 'public', label: 'Public', icon: <Globe className="w-3 h-3" /> },
    { value: 'friends', label: 'Friends', icon: <Users className="w-3 h-3" /> },
    { value: 'onlyme', label: 'Only Me', icon: <Lock className="w-3 h-3" /> },
  ]

  const charCount = postData.postContent.length

  const fileInputStyle: React.CSSProperties = { borderColor: '#ccd0d5', fontSize: '12px' }

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    borderColor: active ? '#3b5998' : '#e5e5e5',
    backgroundColor: active ? '#e7f3ff' : '#fafbfc',
    color: active ? '#3b5998' : '#8a8d91',
    fontSize: '10px',
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f0f2f5' }}>
      {/* ──── Header ──── */}
      <header className="sticky top-0 z-50 w-full border-b" style={{
        background: 'linear-gradient(180deg, #4a6fb5 0%, #3b5998 100%)',
        borderColor: '#2d4373',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{
              width: '34px', height: '34px', backgroundColor: '#ffffff', borderRadius: '2px',
            }}>
              <span style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '22px', fontWeight: 800, color: '#3b5998', lineHeight: 1, marginTop: '-1px',
              }}>f</span>
            </div>
            <div>
              <h1 className="text-white font-bold leading-tight" style={{
                fontSize: '16px', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}>
                2014 Facebook Post Generator
              </h1>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                Create nostalgic posts &middot; Download as screenshot
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
              v5.0
            </span>
          </div>
        </div>
      </header>

      {/* ──── Main Content ──── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* ═══ Left Panel ═══ */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:sticky lg:top-16 space-y-4 pr-1" style={{ scrollbarWidth: 'thin' }}>

              {/* ─── Presets ─── */}
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-3 pt-3 px-4">
                  <CardTitle className="text-xs font-bold flex items-center gap-1.5"
                    style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#3b5998' }} />
                    Quick Presets
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {presets.map((preset, i) => (
                      <button key={i} onClick={() => applyPreset(preset.data)}
                        className="text-center text-xs font-medium px-2 py-1.5 rounded border transition-all duration-150"
                        style={{
                          borderColor: '#e5e5e5', backgroundColor: '#fafbfc', color: '#4b4f56',
                          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '10px',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fafbfc'; e.currentTarget.style.borderColor = '#e5e5e5' }}
                      >
                        <span className="block text-base mb-0.5">{preset.emoji}</span>
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ─── Editor ─── */}
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-3 pt-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-bold flex items-center gap-1.5"
                      style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3l2 2-8.5 8.5H6.5v-2L15 3z" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3" y="16" width="14" height="1" rx="0.5" fill="#3b5998" opacity="0.3"/>
                      </svg>
                      Post Editor
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs"
                      style={{ color: '#8a8d91' }} onClick={resetAll}>
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3.5 px-4 pb-4">
                  {/* Profile Picture */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: '#4b4f56', fontSize: '11px' }}>
                      <User className="w-3 h-3" /> Profile Picture
                    </Label>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                        style={{ borderColor: '#ccd0d5', backgroundColor: '#e9eaed' }}
                        onClick={() => profileInputRef.current?.click()}>
                        <img src={postData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-1 flex-1">
                        <Button type="button" variant="outline" size="sm" className="flex-1 text-xs gap-1"
                          style={{ borderColor: '#ccd0d5', color: '#4b4f56', fontSize: '10px', height: '30px' }}
                          onClick={() => profileInputRef.current?.click()}>
                          <Upload className="w-3 h-3" /> Upload
                        </Button>
                        {postData.profilePicture !== '/fb-default-avatar.svg' && (
                          <Button type="button" variant="ghost" size="sm"
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-1.5"
                            style={{ height: '30px', width: '30px', padding: 0 }}
                            onClick={removeProfilePicture}>
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <input ref={profileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* User Name */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: '#4b4f56', fontSize: '11px' }}>
                      <User className="w-3 h-3" /> Display Name
                    </Label>
                    <Input type="text" placeholder="Enter Facebook name"
                      value={postData.userName} onChange={(e) => updateField('userName', e.target.value)}
                      className="text-sm h-8" style={fileInputStyle} />
                  </div>

                  {/* Timestamp + Visibility */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <Clock className="w-3 h-3" /> Timestamp
                      </Label>
                      <div className="flex gap-1">
                        <Input type="text" placeholder="Oct 12, 2014"
                          value={postData.timestamp} onChange={(e) => updateField('timestamp', e.target.value)}
                          className="text-sm h-8 flex-1" style={fileInputStyle} />
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center justify-center rounded border transition-all"
                            style={{
                              width: '30px', height: '30px', flexShrink: 0,
                              borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#8a8d91',
                            }}
                            onClick={() => setShowTimestampPresets(!showTimestampPresets)}
                          >
                            <Timer className="w-3 h-3" />
                          </button>
                          {showTimestampPresets && (
                            <div className="absolute right-0 top-full mt-1 z-50 border rounded-lg shadow-lg overflow-hidden"
                              style={{ backgroundColor: '#fff', borderColor: '#dddfe2', width: '160px' }}>
                              {timestampPresets.map((preset) => (
                                <button
                                  key={preset.label}
                                  className="w-full text-left px-3 py-1.5 text-xs transition-colors"
                                  style={{
                                    color: '#4b4f56', fontSize: '11px',
                                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                                  }}
                                  onClick={() => applyTimestampPreset(preset.value)}
                                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff' }}
                                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold" style={{ color: '#4b4f56', fontSize: '11px' }}>Visibility</Label>
                      <div className="flex gap-0.5">
                        {visibilityOptions.map(opt => (
                          <button key={opt.value} onClick={() => updateField('visibility', opt.value)}
                            className="flex-1 flex items-center justify-center gap-0.5 py-1.5 rounded border text-xs font-medium transition-all"
                            style={{
                              ...toggleBtnStyle(postData.visibility === opt.value),
                              fontSize: '9px',
                            }}>
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: '#4b4f56', fontSize: '11px' }}>
                      <MapPin className="w-3 h-3" /> Location
                      <span style={{ color: '#bcc0c4', fontWeight: 400, fontSize: '10px' }}>(check-in)</span>
                    </Label>
                    <Input type="text" placeholder="e.g. Central Park, New York"
                      value={postData.location} onChange={(e) => updateField('location', e.target.value)}
                      className="text-sm h-7" style={fileInputStyle} />
                  </div>

                  {/* Feeling/Activity */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: '#4b4f56', fontSize: '11px' }}>
                      <SmilePlus className="w-3 h-3" /> Feeling/Activity
                    </Label>
                    <div className="flex gap-1.5">
                      <select
                        value={postData.feeling}
                        onChange={(e) => updateField('feeling', e.target.value)}
                        className="text-xs rounded border px-2 py-1.5 flex-1"
                        style={{
                          borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#4b4f56',
                          fontSize: '11px', height: '28px',
                        }}
                      >
                        <option value="">None</option>
                        {feelingOptions.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                        <option value="custom">Custom...</option>
                      </select>
                      {postData.feeling === 'custom' && (
                        <Input type="text" placeholder="feeling ..."
                          value={customFeeling} onChange={(e) => {
                            setCustomFeeling(e.target.value)
                            updateField('feeling', `feeling ${e.target.value}`)
                          }}
                          className="text-xs h-7 flex-1" style={fileInputStyle} />
                      )}
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* Post Content with Emoji */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <Type className="w-3 h-3" /> Post Content
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{
                          color: charCount > 63206 ? '#e41e3f' : '#bcc0c4', fontSize: '9px',
                        }}>
                          {charCount > 63206 ? 'Limit exceeded' : `${charCount.toLocaleString()}/63,206`}
                        </span>
                        <div className="relative">
                          <button className="p-0.5 rounded" style={{ color: '#bcc0c4' }}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <span style={{ fontSize: '14px', lineHeight: 1 }}>😊</span>
                          </button>
                          {showEmojiPicker && (
                            <div className="absolute right-0 top-full mt-1 z-50 p-2 border rounded-lg shadow-lg"
                              style={{ backgroundColor: '#fff', borderColor: '#dddfe2', width: '220px' }}>
                              <div className="grid grid-cols-8 gap-0.5">
                                {quickEmojis.map((em, i) => (
                                  <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-sm"
                                    onClick={() => insertEmoji(em)}>
                                    {em}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Textarea placeholder="What's on your mind?"
                      value={postData.postContent} onChange={(e) => updateField('postContent', e.target.value)}
                      rows={4} className="text-sm resize-none" style={{ ...fileInputStyle, fontSize: '13px', lineHeight: '1.5' }} />
                  </div>

                  {/* Attached Image */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: '#4b4f56', fontSize: '11px' }}>
                      <ImageIcon className="w-3 h-3" /> Attached Photo
                      <span style={{ color: '#bcc0c4', fontWeight: 400, fontSize: '10px' }}>(optional)</span>
                    </Label>
                    {postData.attachedImage ? (
                      <div className="relative rounded overflow-hidden border" style={{ borderColor: '#ccd0d5' }}>
                        <img src={postData.attachedImage} alt="" className="w-full max-h-32 object-cover" />
                        <button className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={removeAttachedImage}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button className="w-full h-16 border border-dashed rounded flex flex-col items-center justify-center gap-0.5 transition-colors"
                        style={{ borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#bcc0c4', cursor: 'pointer' }}
                        onClick={() => imageInputRef.current?.click()}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fafbfc'; e.currentTarget.style.borderColor = '#ccd0d5' }}>
                        <ImagePlus className="w-4 h-4" />
                        <span style={{ fontSize: '10px' }}>Click to add a photo</span>
                      </button>
                    )}
                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Tagged Friends Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('taggedFriends')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <UserPlus className="w-3 h-3" /> Tagged Friends
                        {postData.taggedFriends.length > 0 && (
                          <span style={{ color: '#bcc0c4', fontWeight: 400, fontSize: '10px' }}>
                            ({postData.taggedFriends.length})
                          </span>
                        )}
                      </div>
                      {expandedSections.taggedFriends ? <ChevronUp className="w-3 h-3" style={{ color: '#bcc0c4' }} /> : <ChevronDown className="w-3 h-3" style={{ color: '#bcc0c4' }} />}
                    </button>
                    {expandedSections.taggedFriends && (
                      <div className="space-y-2 pt-1">
                        {postData.taggedFriends.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {postData.taggedFriends.map((friend) => (
                              <span key={friend} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border"
                                style={{ borderColor: '#dddfe2', backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '10px' }}>
                                {friend}
                                <button onClick={() => removeTaggedFriend(friend)} className="ml-0.5 hover:text-red-500">
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-1.5">
                          <Input type="text" placeholder="Friend's name"
                            value={newFriendName}
                            onChange={(e) => setNewFriendName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') addTaggedFriend() }}
                            className="text-xs h-7 flex-1" style={fileInputStyle} />
                          <button className="flex items-center justify-center gap-1 py-1 px-2 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(false)}
                            onClick={addTaggedFriend}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Shared Link Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('link')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <Link className="w-3 h-3" /> Shared Link
                        <span style={{ color: '#bcc0c4', fontWeight: 400, fontSize: '10px' }}>(optional)</span>
                      </div>
                      {expandedSections.link ? <ChevronUp className="w-3 h-3" style={{ color: '#bcc0c4' }} /> : <ChevronDown className="w-3 h-3" style={{ color: '#bcc0c4' }} />}
                    </button>
                    <div className="flex items-center gap-2 mb-1.5">
                      <button className="flex-1 flex items-center justify-center gap-1 py-1 rounded border text-xs font-medium transition-all"
                        style={toggleBtnStyle(postData.sharedLink)}
                        onClick={() => updateField('sharedLink', !postData.sharedLink)}>
                        <ExternalLink className="w-3 h-3" />
                        {postData.sharedLink ? 'Link Enabled' : 'Enable Link'}
                      </button>
                    </div>
                    {expandedSections.link && (
                      <div className="space-y-2 pl-0.5">
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Link Title</Label>
                          <Input type="text" placeholder="Page title" value={postData.linkTitle}
                            onChange={(e) => updateField('linkTitle', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Domain</Label>
                          <Input type="text" placeholder="example.com" value={postData.linkDomain}
                            onChange={(e) => updateField('linkDomain', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Description</Label>
                          <Textarea placeholder="Link description..." value={postData.linkDescription}
                            onChange={(e) => updateField('linkDescription', e.target.value)}
                            rows={2} className="text-sm resize-none" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Link Image</Label>
                          {postData.linkImage ? (
                            <div className="relative rounded overflow-hidden border" style={{ borderColor: '#ccd0d5' }}>
                              <img src={postData.linkImage} alt="" className="w-full max-h-20 object-cover" />
                              <button className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={removeLinkImage}>
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ) : (
                            <button className="w-full h-10 border border-dashed rounded flex items-center justify-center gap-1"
                              style={{ borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#bcc0c4', cursor: 'pointer', fontSize: '10px' }}
                              onClick={() => linkImageInputRef.current?.click()}>
                              <FileImage className="w-3.5 h-3.5" /> Add link image
                            </button>
                          )}
                          <input ref={linkImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleLinkImageUpload} />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Engagement Metrics ─── */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold" style={{ color: '#4b4f56', fontSize: '11px' }}>Engagement Metrics</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ field: 'likes' as const, label: 'Likes', icon: Heart },
                        { field: 'comments' as const, label: 'Comments', icon: MessageSquare },
                        { field: 'shares' as const, label: 'Shares', icon: Share2 }
                      ].map(item => (
                        <div key={item.field} className="space-y-0.5">
                          <Label className="text-xs flex items-center gap-0.5" style={{ color: '#8a8d91', fontSize: '10px' }}>
                            <item.icon className="w-2.5 h-2.5" style={{ color: '#3b5998' }} /> {item.label}
                          </Label>
                          <Input type="number" min={0} value={postData[item.field]}
                            onChange={(e) => updateField(item.field, Math.max(0, parseInt(e.target.value) || 0))}
                            className="text-sm text-center h-7" style={fileInputStyle} />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>
                        Top Liker Name
                      </Label>
                      <Input type="text" placeholder="e.g. Jane Smith" value={postData.topLikerName}
                        onChange={(e) => updateField('topLikerName', e.target.value)}
                        className="text-sm h-7" style={fileInputStyle} />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Comments Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('comment')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <MessageCircle className="w-3 h-3" /> Comment Preview
                        <span style={{ color: '#bcc0c4', fontWeight: 400, fontSize: '10px' }}>
                          ({postData.commentsList.length})
                        </span>
                      </div>
                      {expandedSections.comment ? <ChevronUp className="w-3 h-3" style={{ color: '#bcc0c4' }} /> : <ChevronDown className="w-3 h-3" style={{ color: '#bcc0c4' }} />}
                    </button>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <button className="flex-1 flex items-center justify-center gap-1 py-1 rounded border text-xs font-medium transition-all"
                        style={toggleBtnStyle(postData.showCommentPreview)}
                        onClick={() => updateField('showCommentPreview', !postData.showCommentPreview)}>
                        <MessageCircle className="w-3 h-3" />
                        {postData.showCommentPreview ? 'Comments Shown' : 'Show Comments'}
                      </button>
                      <button className="flex items-center justify-center gap-1 py-1 px-2 rounded border text-xs font-medium transition-all"
                        style={toggleBtnStyle(false)}
                        onClick={addComment}>
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    </div>

                    {expandedSections.comment && postData.commentsList.map((c) => (
                      <div key={c.id} className="border rounded p-2 mb-2" style={{
                        borderColor: '#e5e5e5', backgroundColor: '#fafbfc',
                      }}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-7 h-7 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                            style={{ borderColor: '#ccd0d5', backgroundColor: '#e9eaed' }}
                            onClick={() => {
                              const ref = commenterAvatarInputRefs.current[c.id]
                              if (ref) ref.click()
                            }}>
                            <img src={c.commenterAvatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <input ref={(el) => { commenterAvatarInputRefs.current[c.id] = el }}
                            type="file" accept="image/*" className="hidden"
                            onChange={handleCommenterAvatarUpload(c.id)} />
                          <Input type="text" placeholder="Commenter name" value={c.commenterName}
                            onChange={(e) => updateComment(c.id, 'commenterName', e.target.value)}
                            className="text-sm h-7 flex-1" style={{ ...fileInputStyle, fontSize: '11px' }} />
                          {postData.commentsList.length > 1 && (
                            <button className="text-red-400 hover:text-red-600 p-0.5" onClick={() => removeComment(c.id)}>
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <Textarea placeholder="Write a comment..." value={c.commentText}
                          onChange={(e) => updateComment(c.id, 'commentText', e.target.value)}
                          rows={1} className="text-sm resize-none mb-1.5" style={{ ...fileInputStyle, fontSize: '11px' }} />
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '9px' }}>Timestamp</Label>
                            <Input type="text" placeholder="2 hrs" value={c.commentTimestamp}
                              onChange={(e) => updateComment(c.id, 'commentTimestamp', e.target.value)}
                              className="text-sm h-6" style={{ ...fileInputStyle, fontSize: '11px' }} />
                          </div>
                          <div className="w-16">
                            <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '9px' }}>Likes</Label>
                            <Input type="number" min={0} value={c.commentLikes}
                              onChange={(e) => updateComment(c.id, 'commentLikes', Math.max(0, parseInt(e.target.value) || 0))}
                              className="text-sm h-6 text-center" style={{ ...fileInputStyle, fontSize: '11px' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Advanced Options ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('advanced')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#4b4f56', fontSize: '11px' }}>
                        <Monitor className="w-3 h-3" /> Advanced Options
                      </div>
                      {expandedSections.advanced ? <ChevronUp className="w-3 h-3" style={{ color: '#bcc0c4' }} /> : <ChevronDown className="w-3 h-3" style={{ color: '#bcc0c4' }} />}
                    </button>

                    {expandedSections.advanced && (
                      <div className="space-y-2.5 pt-1">
                        {/* Show Nav Bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Monitor className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Facebook Nav Bar
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showNavBar)}
                            onClick={() => updateField('showNavBar', !postData.showNavBar)}>
                            {postData.showNavBar ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Show Sidebars */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Columns3 className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Facebook Sidebars
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showSidebars)}
                            onClick={() => updateField('showSidebars', !postData.showSidebars)}>
                            {postData.showSidebars ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* People Also Like */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <UsersRound className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              People Also Like
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showPeopleAlsoLike)}
                            onClick={() => updateField('showPeopleAlsoLike', !postData.showPeopleAlsoLike)}>
                            {postData.showPeopleAlsoLike ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Watermark */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Stamp className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Show Watermark
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showWatermark)}
                            onClick={() => updateField('showWatermark', !postData.showWatermark)}>
                            {postData.showWatermark ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Hashtags */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Hash className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Highlight Hashtags
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.highlightHashtags)}
                            onClick={() => updateField('highlightHashtags', !postData.highlightHashtags)}>
                            {postData.highlightHashtags ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Truncate Long Posts */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Scissors className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Truncate Long Posts
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.truncateLongPosts)}
                            onClick={() => updateField('truncateLongPosts', !postData.truncateLongPosts)}>
                            {postData.truncateLongPosts ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* More Stories */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Layers className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              More Stories Below
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showMoreStories)}
                            onClick={() => updateField('showMoreStories', !postData.showMoreStories)}>
                            {postData.showMoreStories ? 'On' : 'Off'}
                          </button>
                        </div>
                        <p style={{ fontSize: '9px', color: '#bcc0c4', paddingLeft: '18px' }}>
                          Shows mini post cards below the main post (like 2014 FB feed)
                        </p>

                        {/* Border Radius Slider */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                                Post Border Radius
                              </span>
                            </div>
                            <span style={{ fontSize: '10px', color: '#9197a3' }}>{postData.borderRadius}px</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Minus className="w-3 h-3" style={{ color: '#9197a3' }} />
                            <input
                              type="range"
                              min={0}
                              max={12}
                              value={postData.borderRadius}
                              onChange={(e) => updateField('borderRadius', parseInt(e.target.value))}
                              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                              style={{
                                WebkitAppearance: 'none',
                                appearance: 'none',
                                height: '4px',
                                backgroundColor: '#dddfe2',
                                borderRadius: '2px',
                                outline: 'none',
                              }}
                            />
                            <Plus className="w-3 h-3" style={{ color: '#9197a3' }} />
                          </div>
                        </div>

                        {/* Background Pattern */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Palette className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: '#4b4f56', fontWeight: 600 }}>
                              Post Background
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {postBackgroundOptions.map((bg) => (
                              <button
                                key={bg.value}
                                onClick={() => updateField('postBackground', bg.value)}
                                className="flex items-center gap-1.5 px-2 py-1 rounded border text-xs transition-all"
                                style={{
                                  borderColor: postData.postBackground === bg.value ? '#3b5998' : '#e5e5e5',
                                  backgroundColor: postData.postBackground === bg.value ? '#e7f3ff' : '#fafbfc',
                                  fontSize: '10px',
                                  color: '#4b4f56',
                                }}
                              >
                                <span
                                  className="w-3 h-3 rounded-sm flex-shrink-0 border"
                                  style={{ backgroundColor: bg.color, borderColor: '#dddfe2' }}
                                />
                                {bg.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* ─── Export Section ─── */}
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardContent className="px-4 py-3 space-y-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button
                      className="text-xs gap-1 font-semibold"
                      style={{
                        backgroundColor: '#3b5998', color: '#fff', fontSize: '10px', height: '32px',
                        borderColor: '#3b5998',
                      }}
                      onClick={() => handleDownload('png', 3)}
                      disabled={isDownloading}
                    >
                      <Download className="w-3 h-3" /> PNG 3x
                    </Button>
                    <Button
                      className="text-xs gap-1 font-semibold"
                      style={{
                        backgroundColor: '#ffffff', color: '#4b4f56', fontSize: '10px', height: '32px',
                        borderColor: '#dddfe2',
                      }}
                      onClick={() => handleDownload('png', 2)}
                      disabled={isDownloading}
                    >
                      <Download className="w-3 h-3" /> PNG 2x
                    </Button>
                    <Button
                      className="text-xs gap-1 font-semibold"
                      style={{
                        backgroundColor: '#ffffff', color: '#4b4f56', fontSize: '10px', height: '32px',
                        borderColor: '#dddfe2',
                      }}
                      onClick={() => handleDownload('jpeg', 3)}
                      disabled={isDownloading}
                    >
                      <FileImage className="w-3 h-3" /> JPEG 3x
                    </Button>
                    <Button
                      className="text-xs gap-1 font-semibold"
                      style={{
                        backgroundColor: '#ffffff', color: '#4b4f56', fontSize: '10px', height: '32px',
                        borderColor: '#dddfe2',
                      }}
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="w-3 h-3" /> Copy Image
                    </Button>
                  </div>
                  {isDownloading && (
                    <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#9197a3' }}>
                      <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: '#3b5998 transparent transparent transparent' }} />
                      Generating...
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ═══ Right Panel (Preview) ═══ */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="lg:sticky lg:top-16">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  {postData.showNavBar && (
                    <span className="text-xs px-2 py-0.5 rounded font-medium border"
                      style={{ backgroundColor: '#e7f3ff', color: '#3b5998', borderColor: '#a8c7fa', fontSize: '10px' }}>
                      Full Layout
                    </span>
                  )}
                  {postData.showWatermark && (
                    <span className="text-xs px-2 py-0.5 rounded font-medium border"
                      style={{ backgroundColor: '#fff7e0', color: '#8a6d3b', borderColor: '#f0d68a', fontSize: '10px' }}>
                      Watermark
                    </span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded font-medium border"
                    style={{ backgroundColor: '#e6f4ea', color: '#137333', borderColor: '#a8dab5', fontSize: '10px' }}>
                    2014 Style
                  </span>
                </div>
              </div>
              <div style={{
                borderRadius: '4px', overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '1px solid #dddfe2',
              }}>
                <FBPostPreview ref={previewRef} data={postData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ──── Footer ──── */}
      <footer style={{
        borderTop: '1px solid #dddfe2',
        padding: '12px 20px',
        textAlign: 'center',
        fontSize: '11px',
        color: '#9197a3',
        backgroundColor: '#f0f2f5',
        marginTop: 'auto',
      }}>
        2014 Facebook Post Generator &middot; For entertainment purposes only
      </footer>
    </div>
  )
}
