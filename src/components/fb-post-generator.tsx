'use client'

import { useCallback, useRef, useState } from 'react'
import { FBPostPreview, type FBPostData, defaultPostData } from './fb-post-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ImagePlus, Download, User, Clock, Type, Heart, MessageSquare, Share2, X, Upload } from 'lucide-react'

export default function FBPostGenerator() {
  const previewRef = useRef<HTMLDivElement>(null)

  const [postData, setPostData] = useState<FBPostData>(defaultPostData)
  const [isDownloading, setIsDownloading] = useState(false)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const updateField = useCallback(<K extends keyof FBPostData>(field: K, value: FBPostData[K]) => {
    setPostData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleProfileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateField('profilePicture', url)
    }
  }, [updateField])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateField('attachedImage', url)
    }
  }, [updateField])

  const removeProfilePicture = useCallback(() => {
    updateField('profilePicture', '/fb-default-avatar.svg')
    if (profileInputRef.current) profileInputRef.current.value = ''
  }, [updateField])

  const removeAttachedImage = useCallback(() => {
    updateField('attachedImage', '')
    if (imageInputRef.current) imageInputRef.current.value = ''
  }, [updateField])

  const handleDownload = useCallback(async () => {
    if (!previewRef.current || isDownloading) return
    setIsDownloading(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#e9eaed',
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `facebook-post-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to generate image:', err)
    } finally {
      setIsDownloading(false)
    }
  }, [isDownloading])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{
          backgroundColor: '#3b5998',
          borderColor: '#2d4373',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Classic FB "f" logo */}
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
              }}
            >
              <span
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#3b5998',
                  lineHeight: 1,
                  marginTop: '-1px',
                }}
              >
                f
              </span>
            </div>
            <div>
              <h1
                className="text-white text-lg font-bold leading-tight"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                2014 Facebook Post Generator
              </h1>
              <p className="text-blue-200 text-xs" style={{ opacity: 0.8 }}>
                Create nostalgic Facebook posts from 2014
              </p>
            </div>
          </div>
          <div
            className="hidden sm:flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            <span>v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-20">
              <Card className="border shadow-sm" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-4">
                  <CardTitle
                    className="text-base font-bold flex items-center gap-2"
                    style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L8.5 4.5L5 4L4 7.5L1 9L2.5 12L1 15L4 16.5L5 20L8.5 18.5L10 20L11.5 18.5L15 20L16 16.5L19 15L17.5 12L19 9L16 7.5L15 4L11.5 4.5L10 2Z" fill="#3b5998" opacity="0.15"/>
                      <circle cx="10" cy="11" r="3" fill="none" stroke="#3b5998" strokeWidth="1.5"/>
                    </svg>
                    Post Editor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Profile Picture */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2" style={{ color: '#4b4f56' }}>
                      <User className="w-4 h-4" />
                      Profile Picture
                    </Label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                        style={{ borderColor: '#ccd0d5', backgroundColor: '#e9eaed' }}
                        onClick={() => profileInputRef.current?.click()}
                      >
                        <img
                          src={postData.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2 flex-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs gap-1"
                          style={{ borderColor: '#ccd0d5', color: '#4b4f56' }}
                          onClick={() => profileInputRef.current?.click()}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload
                        </Button>
                        {postData.profilePicture !== '/fb-default-avatar.svg' && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2"
                            onClick={removeProfilePicture}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                      <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileUpload}
                      />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: '#e5e5e5' }} />

                  {/* User Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2" style={{ color: '#4b4f56' }}>
                      <User className="w-4 h-4" />
                      User Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your Facebook name"
                      value={postData.userName}
                      onChange={(e) => updateField('userName', e.target.value)}
                      className="text-sm"
                      style={{ borderColor: '#ccd0d5' }}
                    />
                  </div>

                  {/* Timestamp */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2" style={{ color: '#4b4f56' }}>
                      <Clock className="w-4 h-4" />
                      Timestamp
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g. October 12, 2014 at 4:30 PM"
                      value={postData.timestamp}
                      onChange={(e) => updateField('timestamp', e.target.value)}
                      className="text-sm"
                      style={{ borderColor: '#ccd0d5' }}
                    />
                    <p className="text-xs" style={{ color: '#8a8d91' }}>
                      Classic format: &quot;Month Day, Year at H:MM AM/PM&quot;
                    </p>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2" style={{ color: '#4b4f56' }}>
                      <Type className="w-4 h-4" />
                      Post Content
                    </Label>
                    <Textarea
                      placeholder="What's on your mind?"
                      value={postData.postContent}
                      onChange={(e) => updateField('postContent', e.target.value)}
                      rows={4}
                      className="text-sm resize-none"
                      style={{ borderColor: '#ccd0d5' }}
                    />
                  </div>

                  {/* Attached Image */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2" style={{ color: '#4b4f56' }}>
                      <ImagePlus className="w-4 h-4" />
                      Attached Photo
                      <span className="text-xs font-normal" style={{ color: '#8a8d91' }}>(optional)</span>
                    </Label>
                    {postData.attachedImage ? (
                      <div className="relative rounded overflow-hidden border" style={{ borderColor: '#ccd0d5' }}>
                        <img
                          src={postData.attachedImage}
                          alt="Attached"
                          className="w-full max-h-40 object-cover"
                        />
                        <button
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                          onClick={removeAttachedImage}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-24 border-dashed text-xs gap-2"
                        style={{ borderColor: '#ccd0d5', color: '#8a8d91' }}
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <ImagePlus className="w-5 h-5" />
                        <span>Click to add a photo</span>
                      </Button>
                    )}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  <Separator style={{ backgroundColor: '#e5e5e5' }} />

                  {/* Engagement Metrics */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold" style={{ color: '#4b4f56' }}>
                      Engagement Metrics
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91' }}>
                          <Heart className="w-3 h-3" style={{ color: '#3b5998' }} />
                          Likes
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          value={postData.likes}
                          onChange={(e) => updateField('likes', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center"
                          style={{ borderColor: '#ccd0d5' }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91' }}>
                          <MessageSquare className="w-3 h-3" style={{ color: '#3b5998' }} />
                          Comments
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          value={postData.comments}
                          onChange={(e) => updateField('comments', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center"
                          style={{ borderColor: '#ccd0d5' }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs flex items-center gap-1" style={{ color: '#8a8d91' }}>
                          <Share2 className="w-3 h-3" style={{ color: '#3b5998' }} />
                          Shares
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          value={postData.shares}
                          onChange={(e) => updateField('shares', Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-sm text-center"
                          style={{ borderColor: '#ccd0d5' }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-20">
              <Card className="border shadow-sm overflow-hidden" style={{ borderColor: '#dddfe2' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-base font-bold flex items-center gap-2"
                      style={{ color: '#1d2129', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="3" width="16" height="14" rx="1.5" fill="none" stroke="#3b5998" strokeWidth="1.5"/>
                        <circle cx="7" cy="8" r="1.5" fill="#3b5998"/>
                        <path d="M2 14l5-5 4 4 3-3 4 4" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Live Preview
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#e7f3ff', color: '#3b5998' }}>
                        2014 Style
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Facebook Post Preview */}
                  <div className="rounded-b-lg overflow-hidden">
                    <FBPostPreview ref={previewRef} data={postData} />
                  </div>

                  {/* Download Button */}
                  <div
                    className="p-4 border-t flex items-center gap-3"
                    style={{ backgroundColor: '#fafbfc', borderColor: '#e5e5e5' }}
                  >
                    <Button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex-1 gap-2 text-sm font-semibold text-white"
                      style={{
                        backgroundColor: isDownloading ? '#8a9bc5' : '#3b5998',
                        height: '40px',
                        borderRadius: '2px',
                      }}
                      onMouseOver={(e) => {
                        if (!isDownloading) e.currentTarget.style.backgroundColor = '#2d4373'
                      }}
                      onMouseOut={(e) => {
                        if (!isDownloading) e.currentTarget.style.backgroundColor = '#3b5998'
                      }}
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                            <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Image (PNG)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-auto py-4 text-center text-xs border-t"
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#e5e5e5',
          color: '#8a8d91',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <p>2014 Facebook Post Generator &middot; For nostalgic purposes only</p>
        <p className="mt-1" style={{ color: '#bcc0c4' }}>
          Facebook is a registered trademark of Meta Platforms, Inc.
        </p>
      </footer>
    </div>
  )
}
