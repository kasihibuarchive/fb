'use client'

import { useCallback, useRef, useState } from 'react'
import { FBPostPreview, type FBPostData, type VisibilityOption, defaultPostData, presets } from './fb-post-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ImagePlus, Download, User, Clock, Type, Heart, MessageSquare, Share2,
  X, Upload, Globe, Users, Lock, RotateCcw, Copy, ImageIcon, Link, MessageCircle,
  Sparkles, ChevronDown, ChevronUp, ExternalLink, FileImage
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function FBPostGenerator() {
  const previewRef = useRef<HTMLDivElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const linkImageInputRef = useRef<HTMLInputElement>(null)
  const commenterAvatarInputRef = useRef<HTMLInputElement>(null)

  const [postData, setPostData] = useState<FBPostData>(defaultPostData)
  const [isDownloading, setIsDownloading] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    link: false,
    comment: false,
  })
  const { toast } = useToast()

  const updateField = useCallback(<K extends keyof FBPostData>(field: K, value: FBPostData[K]) => {
    setPostData(prev => ({ ...prev, [field]: value }))
  }, [])

  const toggleSection = useCallback((section: 'link' | 'comment') => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const applyPreset = useCallback((data: FBPostData) => {
    setPostData(data)
    toast({ title: 'Preset applied!', description: 'Post template loaded successfully.' })
  }, [toast])

  const resetAll = useCallback(() => {
    setPostData(defaultPostData)
    setExpandedSections({ link: false, comment: false })
    if (profileInputRef.current) profileInputRef.current.value = ''
    if (imageInputRef.current) imageInputRef.current.value = ''
    if (linkImageInputRef.current) linkImageInputRef.current.value = ''
    if (commenterAvatarInputRef.current) commenterAvatarInputRef.current.value = ''
    toast({ title: 'Reset complete', description: 'All fields have been reset to defaults.' })
  }, [toast])

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

  const handleCommenterAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('commenterAvatar', URL.createObjectURL(file))
  }, [updateField])

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

  const removeCommenterAvatar = useCallback(() => {
    updateField('commenterAvatar', '/fb-default-avatar.svg')
    if (commenterAvatarInputRef.current) commenterAvatarInputRef.current.value = ''
  }, [updateField])

  const handleDownload = useCallback(async (format: 'png' | 'jpeg') => {
    if (!previewRef.current || isDownloading) return
    setIsDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#e9eaed',
        logging: false,
      })
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png'
      const ext = format === 'jpeg' ? 'jpg' : 'png'
      const link = document.createElement('a')
      link.download = `facebook-post-2014-${Date.now()}.${ext}`
      link.href = canvas.toDataURL(mimeType, 0.95)
      link.click()
      toast({ title: 'Downloaded!', description: `Image saved as ${ext.toUpperCase()}` })
    } catch (err) {
      console.error('Failed to generate image:', err)
      toast({ title: 'Error', description: 'Failed to generate image. Please try again.', variant: 'destructive' })
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
            toast({ title: 'Not supported', description: 'Clipboard API is not available in this browser.', variant: 'destructive' })
          }
        }
      })
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [toast])

  const visibilityOptions: { value: VisibilityOption; label: string; icon: React.ReactNode }[] = [
    { value: 'public', label: 'Public', icon: <Globe className="w-3.5 h-3.5" /> },
    { value: 'friends', label: 'Friends', icon: <Users className="w-3.5 h-3.5" /> },
    { value: 'onlyme', label: 'Only Me', icon: <Lock className="w-3.5 h-3.5" /> },
  ]

  const charCount = postData.postContent.length

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f0f2f5' }}>
      {/* ──── Header ──── */}
      <header className="sticky top-0 z-50 w-full border-b" style={{
        backgroundColor: 'linear-gradient(to bottom, #4267B2, #3b5998)',
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
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>
                Create nostalgic Facebook posts &middot; Download as image
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
              v2.0
            </span>
          </div>
        </div>
      </header>

      {/* ──── Main Content ──── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* ═══ Left Panel - Editor ═══ */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-16 space-y-4">
              {/* ─── Presets ─── */}
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-sm font-bold flex items-center gap-2"
                    style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    <Sparkles className="w-4 h-4" style={{ color: '#3b5998' }} />
                    Quick Presets
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset, i) => (
                      <button key={i} onClick={() => applyPreset(preset.data)}
                        className="text-left text-xs font-medium px-3 py-2 rounded border transition-all duration-150 hover:shadow-sm"
                        style={{
                          borderColor: '#e5e5e5', backgroundColor: '#fafbfc', color: '#4b4f56',
                          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fafbfc'; e.currentTarget.style.borderColor = '#e5e5e5' }}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ─── Editor ─── */}
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-4 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2"
                      style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3l2 2-8.5 8.5H6.5v-2L15 3z" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3" y="16" width="14" height="1" rx="0.5" fill="#3b5998" opacity="0.3"/>
                      </svg>
                      Post Editor
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs"
                      style={{ color: '#8a8d91' }} onClick={resetAll}>
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  {/* Profile Picture */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5"
                      style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <User className="w-3.5 h-3.5" /> Profile Picture
                    </Label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                        style={{ borderColor: '#ccd0d5', backgroundColor: '#e9eaed' }}
                        onClick={() => profileInputRef.current?.click()}>
                        <img src={postData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-1.5 flex-1">
                        <Button type="button" variant="outline" size="sm" className="flex-1 text-xs gap-1"
                          style={{ borderColor: '#ccd0d5', color: '#4b4f56', fontSize: '11px' }}
                          onClick={() => profileInputRef.current?.click()}>
                          <Upload className="w-3 h-3" /> Upload
                        </Button>
                        {postData.profilePicture !== '/fb-default-avatar.svg' && (
                          <Button type="button" variant="ghost" size="sm"
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-1.5"
                            onClick={removeProfilePicture}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                      <input ref={profileInputRef} type="file" accept="image/*" className="hidden"
                        onChange={handleProfileUpload} />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* User Name */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5"
                      style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <User className="w-3.5 h-3.5" /> Display Name
                    </Label>
                    <Input type="text" placeholder="Enter Facebook name"
                      value={postData.userName}
                      onChange={(e) => updateField('userName', e.target.value)}
                      className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '13px' }} />
                  </div>

                  {/* Timestamp + Visibility */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold flex items-center gap-1.5"
                        style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        <Clock className="w-3.5 h-3.5" /> Timestamp
                      </Label>
                      <Input type="text" placeholder="Oct 12, 2014"
                        value={postData.timestamp}
                        onChange={(e) => updateField('timestamp', e.target.value)}
                        className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '13px' }} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold"
                        style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        Visibility
                      </Label>
                      <div className="flex gap-1">
                        {visibilityOptions.map(opt => (
                          <button key={opt.value} onClick={() => updateField('visibility', opt.value)}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded border text-xs font-medium transition-all"
                            style={{
                              borderColor: postData.visibility === opt.value ? '#3b5998' : '#e5e5e5',
                              backgroundColor: postData.visibility === opt.value ? '#e7f3ff' : '#fafbfc',
                              color: postData.visibility === opt.value ? '#3b5998' : '#8a8d91',
                              fontSize: '10px',
                            }}>
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* Post Content */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold flex items-center gap-1.5"
                        style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        <Type className="w-3.5 h-3.5" /> Post Content
                      </Label>
                      <span className="text-xs" style={{
                        color: charCount > 63206 ? '#e41e3f' : '#bcc0c4', fontSize: '10px',
                      }}>
                        {charCount > 63206 ? '63,206 limit exceeded' : `${charCount.toLocaleString()} / 63,206`}
                      </span>
                    </div>
                    <Textarea placeholder="What's on your mind?"
                      value={postData.postContent}
                      onChange={(e) => updateField('postContent', e.target.value)}
                      rows={4} className="text-sm resize-none"
                      style={{ borderColor: '#ccd0d5', fontSize: '13px', lineHeight: '1.5' }} />
                  </div>

                  {/* Attached Image */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5"
                      style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <ImageIcon className="w-3.5 h-3.5" /> Attached Photo
                      <span style={{ color: '#bcc0c4', fontWeight: 400 }}>(optional)</span>
                    </Label>
                    {postData.attachedImage ? (
                      <div className="relative rounded overflow-hidden border" style={{ borderColor: '#ccd0d5' }}>
                        <img src={postData.attachedImage} alt="" className="w-full max-h-36 object-cover" />
                        <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '10px' }}
                          onClick={removeAttachedImage}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button className="w-full h-20 border border-dashed rounded flex flex-col items-center justify-center gap-1 transition-colors"
                        style={{ borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#bcc0c4', cursor: 'pointer' }}
                        onClick={() => imageInputRef.current?.click()}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fafbfc'; e.currentTarget.style.borderColor = '#ccd0d5' }}
                      >
                        <ImagePlus className="w-5 h-5" />
                        <span style={{ fontSize: '11px' }}>Click to add a photo</span>
                      </button>
                    )}
                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
                      onChange={handleImageUpload} />
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Shared Link Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-1"
                      onClick={() => toggleSection('link')}>
                      <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        <Link className="w-3.5 h-3.5" /> Shared Link
                        <span style={{ color: '#bcc0c4', fontWeight: 400 }}>(optional)</span>
                      </Label>
                      {expandedSections.link
                        ? <ChevronUp className="w-3.5 h-3.5" style={{ color: '#bcc0c4' }} />
                        : <ChevronDown className="w-3.5 h-3.5" style={{ color: '#bcc0c4' }} />
                      }
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded border text-xs font-medium transition-all"
                        style={{
                          borderColor: postData.sharedLink ? '#3b5998' : '#e5e5e5',
                          backgroundColor: postData.sharedLink ? '#e7f3ff' : '#fafbfc',
                          color: postData.sharedLink ? '#3b5998' : '#8a8d91',
                          fontSize: '11px',
                        }}
                        onClick={() => updateField('sharedLink', !postData.sharedLink)}>
                        <ExternalLink className="w-3 h-3" />
                        {postData.sharedLink ? 'Link Enabled' : 'Enable Link'}
                      </button>
                    </div>

                    {expandedSections.link && (
                      <div className="space-y-3 pl-1">
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '11px' }}>Link Title</Label>
                          <Input type="text" placeholder="Page title"
                            value={postData.linkTitle}
                            onChange={(e) => updateField('linkTitle', e.target.value)}
                            className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '11px' }}>Domain</Label>
                          <Input type="text" placeholder="example.com"
                            value={postData.linkDomain}
                            onChange={(e) => updateField('linkDomain', e.target.value)}
                            className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '11px' }}>Description</Label>
                          <Textarea placeholder="Link description..."
                            value={postData.linkDescription}
                            onChange={(e) => updateField('linkDescription', e.target.value)}
                            rows={2} className="text-sm resize-none"
                            style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '11px' }}>Link Image</Label>
                          {postData.linkImage ? (
                            <div className="relative rounded overflow-hidden border" style={{ borderColor: '#ccd0d5' }}>
                              <img src={postData.linkImage} alt="" className="w-full max-h-24 object-cover" />
                              <button className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
                                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                                onClick={removeLinkImage}>
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button className="w-full h-14 border border-dashed rounded flex items-center justify-center gap-1.5"
                              style={{ borderColor: '#ccd0d5', backgroundColor: '#fafbfc', color: '#bcc0c4', cursor: 'pointer' }}
                              onClick={() => linkImageInputRef.current?.click()}>
                              <FileImage className="w-4 h-4" />
                              <span style={{ fontSize: '11px' }}>Add link image</span>
                            </button>
                          )}
                          <input ref={linkImageInputRef} type="file" accept="image/*" className="hidden"
                            onChange={handleLinkImageUpload} />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Engagement Metrics ─── */}
                  <div className="space-y-2.5">
                    <Label className="text-xs font-semibold"
                      style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Engagement Metrics
                    </Label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="space-y-1">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91', fontSize: '10px' }}>
                          <Heart className="w-3 h-3" style={{ color: '#3b5998' }} /> Likes
                        </Label>
                        <Input type="number" min={0}
                          value={postData.likes}
                          onChange={(e) => updateField('likes', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91', fontSize: '10px' }}>
                          <MessageSquare className="w-3 h-3" style={{ color: '#3b5998' }} /> Comments
                        </Label>
                        <Input type="number" min={0}
                          value={postData.comments}
                          onChange={(e) => updateField('comments', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91', fontSize: '10px' }}>
                          <Share2 className="w-3 h-3" style={{ color: '#3b5998' }} /> Shares
                        </Label>
                        <Input type="number" min={0}
                          value={postData.shares}
                          onChange={(e) => updateField('shares', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>
                        Top Liker Name (shows &quot;Name and X others&quot;)
                      </Label>
                      <Input type="text" placeholder="e.g. Jane Smith"
                        value={postData.topLikerName}
                        onChange={(e) => updateField('topLikerName', e.target.value)}
                        className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#eee' }} />

                  {/* ─── Comment Preview Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-1"
                      onClick={() => toggleSection('comment')}>
                      <Label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        style={{ color: '#4b4f56', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        <MessageCircle className="w-3.5 h-3.5" /> Comment Preview
                        <span style={{ color: '#bcc0c4', fontWeight: 400 }}>(optional)</span>
                      </Label>
                      {expandedSections.comment
                        ? <ChevronUp className="w-3.5 h-3.5" style={{ color: '#bcc0c4' }} />
                        : <ChevronDown className="w-3.5 h-3.5" style={{ color: '#bcc0c4' }} />
                      }
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded border text-xs font-medium transition-all"
                        style={{
                          borderColor: postData.showCommentPreview ? '#3b5998' : '#e5e5e5',
                          backgroundColor: postData.showCommentPreview ? '#e7f3ff' : '#fafbfc',
                          color: postData.showCommentPreview ? '#3b5998' : '#8a8d91',
                          fontSize: '11px',
                        }}
                        onClick={() => updateField('showCommentPreview', !postData.showCommentPreview)}>
                        <MessageCircle className="w-3 h-3" />
                        {postData.showCommentPreview ? 'Comments Shown' : 'Show Comments'}
                      </button>
                    </div>

                    {expandedSections.comment && (
                      <div className="space-y-3 pl-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                            style={{ borderColor: '#ccd0d5', backgroundColor: '#e9eaed' }}
                            onClick={() => commenterAvatarInputRef.current?.click()}>
                            <img src={postData.commenterAvatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <Input type="text" placeholder="Commenter name"
                            value={postData.commenterName}
                            onChange={(e) => updateField('commenterName', e.target.value)}
                            className="text-sm h-8 flex-1" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                          {postData.commenterAvatar !== '/fb-default-avatar.svg' && (
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"
                              onClick={removeCommenterAvatar}>
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                          <input ref={commenterAvatarInputRef} type="file" accept="image/*" className="hidden"
                            onChange={handleCommenterAvatarUpload} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Comment Text</Label>
                          <Textarea placeholder="Write a comment..."
                            value={postData.commentText}
                            onChange={(e) => updateField('commentText', e.target.value)}
                            rows={2} className="text-sm resize-none"
                            style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs" style={{ color: '#8a8d91', fontSize: '10px' }}>Comment Timestamp</Label>
                          <Input type="text" placeholder="e.g. 2 hrs"
                            value={postData.commentTimestamp}
                            onChange={(e) => updateField('commentTimestamp', e.target.value)}
                            className="text-sm h-8" style={{ borderColor: '#ccd0d5', fontSize: '12px' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ═══ Right Panel - Preview ═══ */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-16">
              <Card className="border shadow-sm overflow-hidden" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-3 px-4 pt-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2"
                      style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="3" width="16" height="14" rx="1.5" fill="none" stroke="#3b5998" strokeWidth="1.5"/>
                        <circle cx="7" cy="8" r="1.5" fill="#3b5998"/>
                        <path d="M2 14l5-5 4 4 3-3 4 4" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Live Preview
                    </CardTitle>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '10px' }}>
                      2014 Style
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-b-lg overflow-hidden">
                    <FBPostPreview ref={previewRef} data={postData} />
                  </div>

                  {/* ─── Download Actions ─── */}
                  <div className="p-3 sm:p-4 border-t flex flex-wrap items-center gap-2"
                    style={{ backgroundColor: '#fafbfc', borderColor: '#e5e5e5' }}>
                    <Button
                      onClick={() => handleDownload('png')}
                      disabled={isDownloading}
                      className="flex-1 min-w-[140px] gap-2 text-sm font-semibold text-white"
                      style={{
                        backgroundColor: isDownloading ? '#8a9bc5' : '#3b5998',
                        height: '38px', borderRadius: '2px',
                      }}
                      onMouseOver={(e) => { if (!isDownloading) e.currentTarget.style.backgroundColor = '#2d4373' }}
                      onMouseOut={(e) => { if (!isDownloading) e.currentTarget.style.backgroundColor = '#3b5998' }}
                    >
                      {isDownloading ? (
                        <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                          <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </svg> Generating...</>
                      ) : (
                        <><Download className="w-4 h-4" /> Download PNG</>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleDownload('jpeg')}
                      disabled={isDownloading}
                      className="gap-2 text-sm font-semibold"
                      style={{
                        backgroundColor: '#ffffff', color: '#3b5998',
                        border: '1px solid #3b5998', height: '38px', borderRadius: '2px',
                      }}
                      onMouseOver={(e) => { if (!isDownloading) e.currentTarget.style.backgroundColor = '#e7f3ff' }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
                    >
                      <FileImage className="w-4 h-4" /> JPEG
                    </Button>
                    <Button
                      onClick={handleCopyToClipboard}
                      disabled={isDownloading}
                      className="gap-2 text-sm font-semibold"
                      style={{
                        backgroundColor: '#ffffff', color: '#4b4f56',
                        border: '1px solid #dddfe2', height: '38px', borderRadius: '2px',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0f2f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff' }}
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* ──── Footer ──── */}
      <footer className="mt-auto py-3 text-center border-t" style={{
        backgroundColor: '#ffffff', borderColor: '#e5e5e5', color: '#8a8d91',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '11px',
      }}>
        <p>2014 Facebook Post Generator &middot; For nostalgic purposes only</p>
        <p className="mt-0.5" style={{ color: '#bcc0c4', fontSize: '10px' }}>
          Facebook is a registered trademark of Meta Platforms, Inc.
        </p>
      </footer>
    </div>
  )
}
