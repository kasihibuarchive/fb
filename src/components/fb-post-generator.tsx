'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FBPostPreview, type FBPostData, type VisibilityOption, type CommentData, type ReplyData, type PostBackgroundOption, type CommentSortOrder, type EngagementVisibility, defaultPostData, defaultComment, presets, feelingOptions, postBackgroundOptions, commentSortOptions, engagementVisibilityOptions, lifeEventCategoryOptions, fontFamilyOptions } from './fb-post-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ImagePlus, Download, User, Clock, Type, Heart, MessageSquare, Share2,
  X, Upload, Globe, Users, Lock, RotateCcw, Copy, ImageIcon, Link, MessageCircle,
  Sparkles, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ExternalLink, FileImage, Monitor, Smartphone,
  Plus, Trash2, Hash, Scissors, Timer, Droplets, Columns3, UsersRound, Stamp,
  MapPin, SmilePlus, UserPlus, Layers, Palette, Minus, ShieldCheck, ArrowDownNarrowWide,
  Moon, Sun, Calendar, Type as TypeIcon,
  Bookmark, Bold, Italic, Maximize2, Keyboard, FileDown, FileUp, BarChart3,
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

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const daysOfWeek = ['Su','Mo','Tu','We','Th','Fr','Sa']

interface SavedPost {
  name: string
  data: FBPostData
  timestamp: number
}

export default function FBPostGenerator() {
  const previewRef = useRef<HTMLDivElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const linkImageInputRef = useRef<HTMLInputElement>(null)
  const groupAvatarInputRef = useRef<HTMLInputElement>(null)
  const multiImageInputRef = useRef<HTMLInputElement>(null)
  const importInputRef = useRef<HTMLInputElement>(null)
  const commenterAvatarInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const [postData, setPostData] = useState<FBPostData>(defaultPostData)
  const [isDownloading, setIsDownloading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    link: false,
    comment: false,
    advanced: false,
    taggedFriends: false,
    postExtras: false,
    groupPost: false,
    lifeEvent: false,
    poll: false,
    savedPosts: false,
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showTimestampPresets, setShowTimestampPresets] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [newFriendName, setNewFriendName] = useState('')
  const [customFeeling, setCustomFeeling] = useState('')
  const [customLifeEventCategory, setCustomLifeEventCategory] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [dragOverZone, setDragOverZone] = useState<string | null>(null)
  const [datePickerMonth, setDatePickerMonth] = useState(0)
  const [datePickerYear, setDatePickerYear] = useState(2014)
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([])
  const [resetPending, setResetPending] = useState(false)
  const { toast } = useToast()

  // ── Initialize from localStorage ──
  useEffect(() => {
    const saved = localStorage.getItem('fb-gen-dark-mode')
    if (saved === 'true') setDarkMode(true)
    const posts = localStorage.getItem('fb-gen-saved-posts')
    if (posts) {
      try { setSavedPosts(JSON.parse(posts)) } catch { /* ignore */ }
    }
  }, [])

  // ── Persist saved posts ──
  useEffect(() => {
    if (savedPosts.length > 0) {
      localStorage.setItem('fb-gen-saved-posts', JSON.stringify(savedPosts.slice(0, 20)))
    }
  }, [savedPosts])

  const toggleDarkMode = useCallback(() => {
    const newVal = !darkMode
    setDarkMode(newVal)
    localStorage.setItem('fb-gen-dark-mode', String(newVal))
  }, [darkMode])

  const updateField = useCallback(<K extends keyof FBPostData>(field: K, value: FBPostData[K]) => {
    setPostData(prev => ({ ...prev, [field]: value }))
  }, [])

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const applyPreset = useCallback((data: FBPostData) => {
    setPostData(data)
    setExpandedSections({
      link: data.sharedLink, comment: data.showCommentPreview, advanced: false,
      taggedFriends: false, postExtras: false, groupPost: !!data.groupPostName,
      lifeEvent: data.postType === 'lifeevent', poll: data.postType === 'poll',
      savedPosts: false,
    })
    toast({ title: 'Preset applied!', description: 'Post template loaded successfully.' })
  }, [toast])

  const resetAll = useCallback(() => {
    if (!resetPending) {
      setResetPending(true)
      setTimeout(() => setResetPending(false), 3000)
      return
    }
    setPostData(defaultPostData)
    setExpandedSections({ link: false, comment: false, advanced: false, taggedFriends: false, postExtras: false, groupPost: false, lifeEvent: false, poll: false, savedPosts: false })
    setShowEmojiPicker(false)
    setShowTimestampPresets(false)
    setShowDatePicker(false)
    setNewFriendName('')
    setCustomFeeling('')
    setCustomLifeEventCategory('')
    setResetPending(false)
    if (profileInputRef.current) profileInputRef.current.value = ''
    if (imageInputRef.current) imageInputRef.current.value = ''
    if (multiImageInputRef.current) multiImageInputRef.current.value = ''
    if (linkImageInputRef.current) linkImageInputRef.current.value = ''
    if (groupAvatarInputRef.current) groupAvatarInputRef.current.value = ''
    commenterAvatarInputRefs.current = {}
    toast({ title: 'Reset complete', description: 'All fields have been reset to defaults.' })
  }, [resetPending, toast])

  // ── Saved Posts ──
  const saveCurrentPost = useCallback(() => {
    const autoRecent: SavedPost[] = []
    // Get existing saved posts without "Recent" entries
    const existing = savedPosts.filter(p => !p.name.startsWith('Recent'))
    // Add current as recent
    const now = Date.now()
    autoRecent.unshift({ name: `Recent - ${new Date(now).toLocaleTimeString()}`, data: { ...postData, attachedImage: '' }, timestamp: now })
    // Keep only 3 recent
    const allRecent = [autoRecent[0], ...savedPosts.filter(p => p.name.startsWith('Recent')).slice(0, 2)]
    const combined = [...allRecent, ...existing].slice(0, 20)
    setSavedPosts(combined)
    toast({ title: 'Post saved!', description: 'Saved to your collection.' })
  }, [postData, savedPosts, toast])

  const loadSavedPost = useCallback((post: SavedPost) => {
    setPostData(post.data)
    setExpandedSections({
      link: post.data.sharedLink, comment: post.data.showCommentPreview, advanced: false,
      taggedFriends: false, postExtras: false, groupPost: !!post.data.groupPostName,
      lifeEvent: post.data.postType === 'lifeevent', poll: post.data.postType === 'poll',
      savedPosts: true,
    })
    toast({ title: 'Post loaded', description: `"${post.name}" applied.` })
  }, [toast])

  const deleteSavedPost = useCallback((timestamp: number) => {
    setSavedPosts(prev => prev.filter(p => p.timestamp !== timestamp))
    toast({ title: 'Post deleted', description: 'Removed from saved posts.' })
  }, [toast])

  // ── Import / Export ──
  const exportJSON = useCallback(() => {
    try {
      const json = JSON.stringify(postData, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `fb-post-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
      toast({ title: 'Exported!', description: 'Post configuration downloaded as JSON.' })
    } catch {
      toast({ title: 'Error', description: 'Failed to export JSON.', variant: 'destructive' })
    }
  }, [postData, toast])

  const importJSON = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string)
        if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON')
        // Validate essential fields
        if (typeof parsed.userName === 'string' && typeof parsed.postContent === 'string') {
          setPostData({ ...defaultPostData, ...parsed })
          toast({ title: 'Imported!', description: 'Post configuration loaded from JSON.' })
        } else {
          throw new Error('Missing required fields')
        }
      } catch (err) {
        toast({ title: 'Import failed', description: 'Invalid JSON file or missing fields.', variant: 'destructive' })
      }
    }
    reader.readAsText(file)
    if (importInputRef.current) importInputRef.current.value = ''
  }, [toast])

  // ── Upload handlers ──
  const handleProfileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('profilePicture', URL.createObjectURL(file))
  }, [updateField])

  const handleMultiImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const currentImages = postData.attachedImages.filter(i => i && i.trim())
    const remaining = 6 - currentImages.length
    if (remaining <= 0) return
    const newImages = Array.from(files).slice(0, remaining).map(f => URL.createObjectURL(f))
    const combined = [...currentImages, ...newImages].slice(0, 6)
    updateField('attachedImages', combined)
    updateField('attachedImage', combined[0] || '')
    if (multiImageInputRef.current) multiImageInputRef.current.value = ''
  }, [postData.attachedImages, updateField])

  const removeImageAt = useCallback((index: number) => {
    const current = [...postData.attachedImages]
    current.splice(index, 1)
    if (current.length === 0) current.push('')
    updateField('attachedImages', current)
    updateField('attachedImage', current[0] || '')
  }, [postData.attachedImages, updateField])

  const handleLinkImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('linkImage', URL.createObjectURL(file))
  }, [updateField])

  const handleGroupAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) updateField('groupPostAvatar', URL.createObjectURL(file))
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
      replies: [],
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

  // ── Reply CRUD ──
  const addReply = useCallback((commentId: string) => {
    const newReply: ReplyData = {
      id: `r-${Date.now()}`,
      name: 'New Person',
      avatar: '/fb-default-avatar.svg',
      text: 'Great point!',
      timestamp: 'Just now',
    }
    setPostData(prev => ({
      ...prev,
      commentsList: prev.commentsList.map(c =>
        c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c
      ),
    }))
  }, [])

  const removeReply = useCallback((commentId: string, replyId: string) => {
    setPostData(prev => ({
      ...prev,
      commentsList: prev.commentsList.map(c =>
        c.id === commentId ? { ...c, replies: c.replies.filter(r => r.id !== replyId) } : c
      ),
    }))
  }, [])

  const updateReply = useCallback((commentId: string, replyId: string, field: keyof ReplyData, value: string) => {
    setPostData(prev => ({
      ...prev,
      commentsList: prev.commentsList.map(c =>
        c.id === commentId ? {
          ...c,
          replies: c.replies.map(r =>
            r.id === replyId ? { ...r, [field]: value } : r
          ),
        } : c
      ),
    }))
  }, [])

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

  // ── Date Picker ──
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay()

  const pickDate = useCallback((day: number) => {
    const dateStr = `${months[datePickerMonth]} ${day}, ${datePickerYear} at 12:00 PM`
    updateField('timestamp', dateStr)
    setShowDatePicker(false)
  }, [datePickerMonth, datePickerYear, updateField])

  const prevMonth = useCallback(() => {
    if (datePickerMonth === 0) {
      setDatePickerMonth(11)
      setDatePickerYear(y => y - 1)
    } else {
      setDatePickerMonth(m => m - 1)
    }
  }, [datePickerMonth])

  const nextMonth = useCallback(() => {
    if (datePickerMonth === 11) {
      setDatePickerMonth(0)
      setDatePickerYear(y => y + 1)
    } else {
      setDatePickerMonth(m => m + 1)
    }
  }, [datePickerMonth])

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

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault()
          saveCurrentPost()
        } else if (e.key === 'e') {
          e.preventDefault()
          handleDownload('png', 3)
        } else if (e.key === 'z') {
          e.preventDefault()
          resetAll()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [saveCurrentPost, handleDownload, resetAll])

  // ── Poll helpers ──
  const addPollOption = useCallback(() => {
    if (postData.pollOptions.length < 4) {
      updateField('pollOptions', [...postData.pollOptions, ''])
      updateField('pollVotes', [...postData.pollVotes, 0])
    }
  }, [postData.pollOptions, postData.pollVotes, updateField])

  const removePollOption = useCallback((index: number) => {
    updateField('pollOptions', postData.pollOptions.filter((_, i) => i !== index))
    updateField('pollVotes', postData.pollVotes.filter((_, i) => i !== index))
  }, [postData.pollOptions, postData.pollVotes, updateField])

  const updatePollOption = useCallback((index: number, value: string) => {
    const newOptions = [...postData.pollOptions]
    newOptions[index] = value
    updateField('pollOptions', newOptions)
  }, [postData.pollOptions, updateField])

  const updatePollVote = useCallback((index: number, value: number) => {
    const newVotes = [...postData.pollVotes]
    newVotes[index] = Math.max(0, value)
    updateField('pollVotes', newVotes)
    // Auto-calculate total
    updateField('pollTotalVotes', newVotes.reduce((a, b) => a + b, 0))
  }, [postData.pollVotes, updateField])

  // ── Photo grid helpers ──
  const validImages = (postData.attachedImages || []).filter(i => i && i.trim())

  const visibilityOptions: { value: VisibilityOption; label: string; icon: React.ReactNode }[] = [
    { value: 'public', label: 'Public', icon: <Globe className="w-3 h-3" /> },
    { value: 'friends', label: 'Friends', icon: <Users className="w-3 h-3" /> },
    { value: 'onlyme', label: 'Only Me', icon: <Lock className="w-3 h-3" /> },
  ]

  const charCount = postData.postContent.length

  // Count enabled advanced options
  const enabledAdvancedCount = [
    postData.showNavBar,
    postData.showSidebars,
    postData.showPeopleAlsoLike,
    postData.showWatermark,
    postData.highlightHashtags,
    postData.truncateLongPosts,
    postData.showMoreStories,
    postData.postFontFamily !== 'default',
    postData.borderRadius !== 3,
    postData.postBackground !== 'white',
    postData.textStyle !== 'normal',
  ].filter(Boolean).length

  const isDark = darkMode
  const darkBg = isDark ? '#1a1a2e' : '#f0f2f5'
  const darkCard = isDark ? '#252540' : '#ffffff'
  const darkCardBorder = isDark ? '#3a3a5c' : '#dddfe2'
  const darkText = isDark ? '#e0e0e0' : '#1d2129'
  const darkTextSecondary = isDark ? '#a0a0b8' : '#8a8d91'
  const darkInputBg = isDark ? '#1e1e38' : '#fafbfc'
  const darkInputBorder = isDark ? '#3a3a5c' : '#ccd0d5'
  const darkLabelColor = isDark ? '#c0c0d8' : '#4b4f56'
  const darkDropdownBg = isDark ? '#252540' : '#ffffff'
  const darkDropdownHover = isDark ? '#3a3a5c' : '#e7f3ff'
  const fileInputStyle: React.CSSProperties = { borderColor: darkInputBorder, fontSize: '12px', backgroundColor: darkInputBg, color: darkText, transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    borderColor: active ? '#3b5998' : darkInputBorder,
    backgroundColor: active ? '#e7f3ff' : darkInputBg,
    color: active ? '#3b5998' : darkTextSecondary,
    fontSize: '10px',
  })

  // Drag-and-drop handlers
  const handleDragOver = useCallback((e: React.DragEvent, zone: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverZone(zone)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverZone(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, zone: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverZone(null)
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    if (zone === 'profile') updateField('profilePicture', url)
    else if (zone === 'photo') {
      const current = postData.attachedImages.filter(i => i && i.trim())
      if (current.length < 6) {
        const combined = [...current, url]
        updateField('attachedImages', combined)
        updateField('attachedImage', combined[0] || '')
      }
    }
    else if (zone === 'linkImage') updateField('linkImage', url)
    toast({ title: 'Image added', description: `Photo uploaded via drag & drop.` })
  }, [updateField, toast, postData.attachedImages])

  // Shareable URL
  const generateShareURL = useCallback(() => {
    try {
      const shareData = { n: postData.userName, t: postData.timestamp, p: postData.postContent, l: postData.likes, c: postData.comments, s: postData.shares }
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(shareData))))
      const url = `${window.location.origin}${window.location.pathname}?d=${encoded}`
      navigator.clipboard.writeText(url).then(() => {
        toast({ title: 'Link copied!', description: 'Shareable URL copied to clipboard.' })
      }).catch(() => {
        toast({ title: 'Shareable URL', description: url, variant: 'default' })
      })
      window.history.replaceState(null, '', `?d=${encoded}`)
    } catch {
      toast({ title: 'Error', description: 'Failed to generate share URL.', variant: 'destructive' })
    }
  }, [postData, toast])

  // Load from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const d = params.get('d')
    if (d) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(d))))
        if (decoded.n || decoded.p) {
          setPostData(prev => ({
            ...prev,
            userName: decoded.n || prev.userName,
            timestamp: decoded.t || prev.timestamp,
            postContent: decoded.p || prev.postContent,
            likes: decoded.l ?? prev.likes,
            comments: decoded.c ?? prev.comments,
            shares: decoded.s ?? prev.shares,
          }))
          toast({ title: 'Post loaded', description: 'Post data loaded from shared URL.' })
        }
      } catch { /* ignore invalid data */ }
    }
  }, [toast])

  // ── Date picker rendering data ──
  const daysInMonth = getDaysInMonth(datePickerMonth, datePickerYear)
  const firstDay = getFirstDayOfMonth(datePickerMonth, datePickerYear)
  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: darkBg }}>
      {/* ──── Header ──── */}
      <header className="sticky top-0 z-50 w-full border-b" style={{
        background: isDark
          ? 'linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%)'
          : 'linear-gradient(180deg, #4a6fb5 0%, #3b5998 100%)',
        borderColor: isDark ? '#3a3a5c' : '#2d4373',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{
              width: '34px', height: '34px', backgroundColor: isDark ? '#3b5998' : '#ffffff', borderRadius: '2px',
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
          <div className="flex items-center gap-1.5">
            {/* Save Post */}
            <button onClick={saveCurrentPost} className="flex items-center justify-center rounded border transition-all"
              style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              title="Save post (Ctrl+S)">
              <Bookmark className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>
            {/* Export JSON */}
            <button onClick={exportJSON} className="flex items-center justify-center rounded border transition-all"
              style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              title="Export JSON">
              <FileDown className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>
            {/* Import JSON */}
            <button onClick={() => importInputRef.current?.click()} className="flex items-center justify-center rounded border transition-all"
              style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              title="Import JSON">
              <FileUp className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>
            <input ref={importInputRef} type="file" accept=".json" className="hidden" onChange={importJSON} />
            <button onClick={generateShareURL} className="flex items-center justify-center rounded border transition-all"
              style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              title="Share post via URL">
              <Share2 className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>
            <button onClick={toggleDarkMode} className="flex items-center justify-center rounded border transition-all"
              style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <Sun className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} /> : <Moon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.8)' }} />}
            </button>
            <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
              v10.0
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

              {/* ─── Saved Posts ─── */}
              {savedPosts.length > 0 && (
                <Card className="border shadow-sm" style={{ borderColor: darkCardBorder, backgroundColor: darkCard }}>
                  <CardHeader className="pb-2 pt-3 px-4">
                    <button className="w-full flex items-center justify-between" onClick={() => toggleSection('savedPosts')}>
                      <CardTitle className="text-xs font-bold flex items-center gap-1.5"
                        style={{ color: darkText, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        <Bookmark className="w-3.5 h-3.5" style={{ color: '#3b5998' }} />
                        Saved Posts
                        <span className="text-xs px-1.5 py-0 rounded-full font-bold" style={{
                          backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '9px',
                        }}>
                          {savedPosts.length}
                        </span>
                      </CardTitle>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.savedPosts ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} />
                      </div>
                    </button>
                  </CardHeader>
                  {expandedSections.savedPosts && (
                    <CardContent className="px-4 pb-3 pt-0 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                      {savedPosts.map((post) => (
                        <div key={post.timestamp} className="flex items-center gap-2 py-1.5 rounded px-1" style={{ borderBottom: `1px solid ${isDark ? '#3a3a5c' : '#f0f2f5'}`, transition: 'background-color 0.15s ease', cursor: 'pointer' }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = isDark ? '#3a3a5c' : '#f0f2f5' }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          onClick={() => loadSavedPost(post)}>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate" style={{ color: darkText, fontSize: '11px' }}>{post.name}</div>
                            <div style={{ fontSize: '9px', color: darkTextSecondary }}>
                              {new Date(post.timestamp).toLocaleDateString()} {new Date(post.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                          <button className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-xs font-medium"
                            style={toggleBtnStyle(false)}
                            onClick={() => loadSavedPost(post)}>
                            Load
                          </button>
                          <button className="text-red-400 hover:text-red-600 p-0.5" onClick={() => deleteSavedPost(post.timestamp)}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              )}

              {/* ─── Presets ─── */}
              <Card className="border shadow-sm" style={{ borderColor: darkCardBorder, backgroundColor: darkCard }}>
                <CardHeader className="pb-3 pt-3 px-4">
                  <CardTitle className="text-xs font-bold flex items-center gap-1.5"
                    style={{ color: darkText, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#3b5998' }} />
                    Quick Presets
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {presets.map((preset, i) => (
                      <button key={i} onClick={() => applyPreset(preset.data)}
                        className="text-center text-xs font-medium px-2 py-1.5 rounded border"
                        style={{
                          borderColor: darkCardBorder, backgroundColor: darkInputBg, color: darkText,
                          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '10px',
                          transform: 'scale(1)', opacity: 1,
                          transition: 'transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa'; e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.opacity = '0.9' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = darkInputBg; e.currentTarget.style.borderColor = darkCardBorder; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
                        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
                      >
                        <span className="block text-base mb-0.5">{preset.emoji}</span>
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ─── Editor ─── */}
              <Card className="border" style={{ borderColor: darkCardBorder, backgroundColor: darkCard, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: '3px solid #3b5998' }}>
                <CardHeader className="pb-3 pt-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-bold flex items-center gap-1.5"
                      style={{ color: darkText, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3l2 2-8.5 8.5H6.5v-2L15 3z" stroke="#3b5998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3" y="16" width="14" height="1" rx="0.5" fill="#3b5998" opacity="0.3"/>
                      </svg>
                      Post Editor
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {resetPending && (
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium animate-pulse"
                          style={{ backgroundColor: '#fef3c7', color: '#92400e', fontSize: '9px' }}>
                          Press again to confirm
                        </span>
                      )}
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs"
                        style={{ color: darkTextSecondary }} onClick={resetAll}>
                        <RotateCcw className="w-3 h-3 mr-1" /> Reset
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3.5 px-4 pb-4">
                  {/* Profile Picture */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: darkLabelColor, fontSize: '11px' }}>
                      <User className="w-3 h-3" /> Profile Picture
                    </Label>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer relative"
                        style={{ borderColor: dragOverZone === 'profile' ? '#3b5998' : darkInputBorder, backgroundColor: dragOverZone === 'profile' ? '#e7f3ff' : '#e9eaed', transition: 'all 0.2s' }}
                        onClick={() => profileInputRef.current?.click()}
                        onDragOver={(e) => handleDragOver(e, 'profile')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, 'profile')}
                      >
                        {dragOverZone === 'profile' && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(59,89,152,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px' }}><Upload className="w-4 h-4" style={{ color: '#3b5998' }} /></div>}
                        <img src={postData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-1 flex-1">
                        <Button type="button" variant="outline" size="sm" className="flex-1 text-xs gap-1"
                          style={{ borderColor: darkInputBorder, color: darkLabelColor, fontSize: '10px', height: '30px' }}
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

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* User Name */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: darkLabelColor, fontSize: '11px' }}>
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
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
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
                              borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkTextSecondary,
                            }}
                            onClick={() => { setShowTimestampPresets(false); setShowDatePicker(!showDatePicker) }}
                          >
                            <Calendar className="w-3 h-3" />
                          </button>
                          {showDatePicker && (
                            <div className="absolute right-0 top-full mt-1 z-50 border rounded-lg shadow-lg overflow-hidden p-2"
                              style={{ backgroundColor: darkDropdownBg, borderColor: darkCardBorder, width: '220px' }}>
                              <div className="flex items-center justify-between mb-2">
                                <button onClick={prevMonth} className="p-1 rounded hover:opacity-70" style={{ color: darkText }}>
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-semibold" style={{ color: darkText }}>
                                  {months[datePickerMonth]} {datePickerYear}
                                </span>
                                <button onClick={nextMonth} className="p-1 rounded hover:opacity-70" style={{ color: darkText }}>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-7 gap-0 mb-1">
                                {daysOfWeek.map(d => (
                                  <div key={d} className="text-center text-xs font-semibold py-0.5" style={{ color: darkTextSecondary, fontSize: '9px' }}>{d}</div>
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-0">
                                {calendarDays.map((day, i) => (
                                  <button key={i}
                                    className="w-7 h-7 flex items-center justify-center rounded text-xs transition-colors"
                                    style={{
                                      color: day ? darkText : 'transparent',
                                      fontSize: '11px',
                                      cursor: day ? 'pointer' : 'default',
                                    }}
                                    onClick={() => day && pickDate(day)}
                                    onMouseOver={(e) => { if (day) e.currentTarget.style.backgroundColor = '#e7f3ff' }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                                  >
                                    {day}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center justify-center rounded border transition-all"
                            style={{
                              width: '30px', height: '30px', flexShrink: 0,
                              borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkTextSecondary,
                            }}
                            onClick={() => { setShowDatePicker(false); setShowTimestampPresets(!showTimestampPresets) }}
                          >
                            <Timer className="w-3 h-3" />
                          </button>
                          {showTimestampPresets && (
                            <div className="absolute right-0 top-full mt-1 z-50 border rounded-lg shadow-lg overflow-hidden"
                              style={{ backgroundColor: darkDropdownBg, borderColor: darkCardBorder, width: '160px' }}>
                              {timestampPresets.map((preset) => (
                                <button
                                  key={preset.label}
                                  className="w-full text-left px-3 py-1.5 text-xs transition-colors"
                                  style={{
                                    color: darkLabelColor, fontSize: '11px',
                                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                                  }}
                                  onClick={() => applyTimestampPreset(preset.value)}
                                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = darkDropdownHover }}
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
                      <Label className="text-xs font-semibold" style={{ color: darkLabelColor, fontSize: '11px' }}>Visibility</Label>
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
                      style={{ color: darkLabelColor, fontSize: '11px' }}>
                      <MapPin className="w-3 h-3" /> Location
                      <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>(check-in)</span>
                    </Label>
                    <Input type="text" placeholder="e.g. Central Park, New York"
                      value={postData.location} onChange={(e) => updateField('location', e.target.value)}
                      className="text-sm h-7" style={fileInputStyle} />
                  </div>

                  {/* Feeling/Activity */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: darkLabelColor, fontSize: '11px' }}>
                      <SmilePlus className="w-3 h-3" /> Feeling/Activity
                    </Label>
                    <div className="flex gap-1.5">
                      <select
                        value={postData.feeling}
                        onChange={(e) => updateField('feeling', e.target.value)}
                        className="text-xs rounded border px-2 py-1.5 flex-1"
                        style={{
                          borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkLabelColor,
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

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* Post Content with Emoji + Text Formatting */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <Type className="w-3 h-3" /> Post Content
                      </Label>
                      <div className="flex items-center gap-1">
                        {/* Text formatting toggles */}
                        <div className="flex items-center gap-0.5 mr-1">
                          <button className="w-6 h-6 flex items-center justify-center rounded border transition-all"
                            style={{
                              ...toggleBtnStyle(postData.textStyle === 'bold'),
                              width: '22px', height: '22px', padding: 0,
                            }}
                            onClick={() => updateField('textStyle', postData.textStyle === 'bold' ? 'normal' : 'bold')}
                            title="Bold">
                            <Bold className="w-3 h-3" />
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center rounded border transition-all"
                            style={{
                              ...toggleBtnStyle(postData.textStyle === 'italic'),
                              width: '22px', height: '22px', padding: 0,
                            }}
                            onClick={() => updateField('textStyle', postData.textStyle === 'italic' ? 'normal' : 'italic')}
                            title="Italic">
                            <Italic className="w-3 h-3" />
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center rounded border transition-all"
                            style={{
                              ...toggleBtnStyle(postData.textStyle === 'large'),
                              width: '22px', height: '22px', padding: 0,
                            }}
                            onClick={() => updateField('textStyle', postData.textStyle === 'large' ? 'normal' : 'large')}
                            title="Large text">
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs" style={{
                          color: charCount > 63206 ? '#e41e3f' : darkTextSecondary, fontSize: '9px',
                        }}>
                          {charCount > 63206 ? 'Limit exceeded' : `${charCount.toLocaleString()}/63,206`}
                        </span>
                        <div className="relative">
                          <button className="p-0.5 rounded" style={{ color: darkTextSecondary }}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <span style={{ fontSize: '14px', lineHeight: 1 }}>😊</span>
                          </button>
                          {showEmojiPicker && (
                            <div className="absolute right-0 top-full mt-1 z-50 p-2 border rounded-lg shadow-lg"
                              style={{ backgroundColor: darkDropdownBg, borderColor: darkCardBorder, width: '220px' }}>
                              <div className="grid grid-cols-6 gap-1">
                                {quickEmojis.map((em, i) => (
                                  <button key={i} className="w-7 h-7 flex items-center justify-center rounded text-sm"
                                    style={{ backgroundColor: 'transparent', transition: 'background-color 0.15s' }}
                                    onClick={() => insertEmoji(em)}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = isDark ? '#3a3a5c' : '#e7f3ff' }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
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

                  {/* Attached Photos (Multi) */}
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1"
                      style={{ color: darkLabelColor, fontSize: '11px' }}>
                      <ImageIcon className="w-3 h-3" /> Attached Photos
                      {validImages.length > 0 && (
                        <span className="text-xs px-1.5 py-0 rounded-full font-bold" style={{
                          backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '9px',
                        }}>
                          {validImages.length}/6
                        </span>
                      )}
                    </Label>
                    {validImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5">
                        {validImages.map((img, i) => (
                          <div key={i} className="relative rounded overflow-hidden border aspect-square"
                            style={{ borderColor: darkInputBorder }}>
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => removeImageAt(i)}>
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                        {validImages.length < 6 && (
                          <button className="aspect-square border border-dashed rounded flex flex-col items-center justify-center gap-0.5 transition-colors"
                            style={{ borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkTextSecondary, cursor: 'pointer' }}
                            onClick={() => multiImageInputRef.current?.click()}>
                            <Plus className="w-4 h-4" />
                            <span style={{ fontSize: '9px' }}>Add</span>
                          </button>
                        )}
                      </div>
                    )}
                    {validImages.length === 0 && (
                      <button className="w-full h-16 border border-dashed rounded flex flex-col items-center justify-center gap-0.5 transition-colors"
                        style={{ borderColor: dragOverZone === 'photo' ? '#3b5998' : darkInputBorder, backgroundColor: dragOverZone === 'photo' ? '#e7f3ff' : darkInputBg, color: darkTextSecondary, cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => multiImageInputRef.current?.click()}
                        onDragOver={(e) => handleDragOver(e, 'photo')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, 'photo')}
                        onMouseOver={(e) => { if (dragOverZone !== 'photo') { e.currentTarget.style.backgroundColor = '#e7f3ff'; e.currentTarget.style.borderColor = '#a8c7fa' } }}
                        onMouseOut={(e) => { if (dragOverZone !== 'photo') { e.currentTarget.style.backgroundColor = darkInputBg; e.currentTarget.style.borderColor = darkInputBorder } }}>
                        {dragOverZone === 'photo' ? <><Upload className="w-4 h-4 mb-0.5" style={{ color: '#3b5998' }} /><span style={{ fontSize: '10px', color: '#3b5998', fontWeight: 600 }}>Drop image here</span></> : <><ImagePlus className="w-4 h-4" /><span style={{ fontSize: '10px' }}>Click or drag to add (max 6)</span></>}
                      </button>
                    )}
                    <input ref={multiImageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleMultiImageUpload} />
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Poll Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('poll')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <BarChart3 className="w-3 h-3" /> Poll Post
                        {postData.postType === 'poll' && (
                          <span className="px-1.5 py-0 rounded text-xs font-bold" style={{ backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '9px' }}>ON</span>
                        )}
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.poll ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
                    </button>
                    {expandedSections.poll && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>Enable Poll</span>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.postType === 'poll')}
                            onClick={() => {
                              const newType = postData.postType === 'poll' ? 'default' : 'poll'
                              updateField('postType', newType)
                              if (newType === 'poll' && postData.pollOptions.length === 0) {
                                updateField('pollOptions', ['Option 1', 'Option 2'])
                                updateField('pollVotes', [0, 0])
                              }
                            }}>
                            {postData.postType === 'poll' ? 'On' : 'Off'}
                          </button>
                        </div>
                        {postData.postType === 'poll' && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Poll Question</Label>
                              <Input type="text" placeholder="e.g. What's your favorite season?"
                                value={postData.pollQuestion} onChange={(e) => updateField('pollQuestion', e.target.value)}
                                className="text-sm h-7" style={fileInputStyle} />
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>
                                  Options ({postData.pollOptions.length}/4)
                                </Label>
                                {postData.pollOptions.length < 4 && (
                                  <button className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border"
                                    style={toggleBtnStyle(false)}
                                    onClick={addPollOption}>
                                    <Plus className="w-2.5 h-2.5" /> Add
                                  </button>
                                )}
                              </div>
                              {postData.pollOptions.map((option, i) => (
                                <div key={i} className="flex gap-1.5 items-center">
                                  <Input type="text" placeholder={`Option ${i + 1}`}
                                    value={option} onChange={(e) => updatePollOption(i, e.target.value)}
                                    className="text-xs h-6 flex-1" style={{ ...fileInputStyle, fontSize: '11px' }} />
                                  <Input type="number" min={0} placeholder="Votes"
                                    value={postData.pollVotes[i] || 0}
                                    onChange={(e) => updatePollVote(i, parseInt(e.target.value) || 0)}
                                    className="text-xs h-6 w-16 text-center" style={{ ...fileInputStyle, fontSize: '11px' }} />
                                  {postData.pollOptions.length > 2 && (
                                    <button className="text-red-400 hover:text-red-600 p-0.5 flex-shrink-0" onClick={() => removePollOption(i)}>
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between" style={{ fontSize: '10px', color: darkTextSecondary }}>
                              <span>Total votes: {postData.pollTotalVotes}</span>
                              <span className="text-xs px-1.5 py-0 rounded" style={{ backgroundColor: isDark ? '#1e1e38' : '#f0f2f5' }}>
                                Auto-calculated
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Life Event Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('lifeEvent')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <Calendar className="w-3 h-3" /> Life Event
                        {postData.postType === 'lifeevent' && (
                          <span className="px-1.5 py-0 rounded text-xs font-bold" style={{ backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '9px' }}>ON</span>
                        )}
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.lifeEvent ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
                    </button>
                    {expandedSections.lifeEvent && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>Enable Life Event</span>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.postType === 'lifeevent')}
                            onClick={() => updateField('postType', postData.postType === 'lifeevent' ? 'default' : 'lifeevent')}>
                            {postData.postType === 'lifeevent' ? 'On' : 'Off'}
                          </button>
                        </div>
                        {postData.postType === 'lifeevent' && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Category</Label>
                              <select
                                value={postData.lifeEventCategory === 'Custom...' ? 'custom' : postData.lifeEventCategory}
                                onChange={(e) => {
                                  if (e.target.value === 'custom') {
                                    setCustomLifeEventCategory('')
                                    updateField('lifeEventCategory', 'Custom...')
                                  } else {
                                    updateField('lifeEventCategory', e.target.value)
                                  }
                                }}
                                className="text-xs rounded border px-2 py-1.5 w-full"
                                style={{
                                  borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkLabelColor,
                                  fontSize: '11px', height: '28px',
                                }}
                              >
                                <option value="">Select category...</option>
                                {lifeEventCategoryOptions.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="custom">Custom...</option>
                              </select>
                              {postData.lifeEventCategory === 'Custom...' && (
                                <Input type="text" placeholder="e.g. Adopted a dog"
                                  value={customLifeEventCategory}
                                  onChange={(e) => {
                                    setCustomLifeEventCategory(e.target.value)
                                    updateField('lifeEventCategory', e.target.value)
                                  }}
                                  className="text-xs h-7 w-full mt-1" style={fileInputStyle} />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Event Date</Label>
                              <Input type="text" placeholder="e.g. May 2014"
                                value={postData.lifeEventDate} onChange={(e) => updateField('lifeEventDate', e.target.value)}
                                className="text-sm h-7" style={fileInputStyle} />
                            </div>
                            <div className="space-y-0.5">
                              <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Description</Label>
                              <Input type="text" placeholder="e.g. Stanford University — B.S. Computer Science"
                                value={postData.lifeEventDescription} onChange={(e) => updateField('lifeEventDescription', e.target.value)}
                                className="text-sm h-7" style={fileInputStyle} />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Tagged Friends Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('taggedFriends')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <UserPlus className="w-3 h-3" /> Tagged Friends
                        {postData.taggedFriends.length > 0 && (
                          <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>
                            ({postData.taggedFriends.length})
                          </span>
                        )}
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.taggedFriends ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
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

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Shared Link Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('link')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <Link className="w-3 h-3" /> Shared Link
                        <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>(optional)</span>
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.link ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
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
                          <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Link Title</Label>
                          <Input type="text" placeholder="Page title" value={postData.linkTitle}
                            onChange={(e) => updateField('linkTitle', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Domain</Label>
                          <Input type="text" placeholder="example.com" value={postData.linkDomain}
                            onChange={(e) => updateField('linkDomain', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Description</Label>
                          <Textarea placeholder="Link description..." value={postData.linkDescription}
                            onChange={(e) => updateField('linkDescription', e.target.value)}
                            rows={2} className="text-sm resize-none" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Link Image</Label>
                          {postData.linkImage ? (
                            <div className="relative rounded overflow-hidden border" style={{ borderColor: darkInputBorder }}>
                              <img src={postData.linkImage} alt="" className="w-full max-h-20 object-cover" />
                              <button className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={removeLinkImage}>
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ) : (
                            <button className="w-full h-10 border border-dashed rounded flex items-center justify-center gap-1"
                              style={{ borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkTextSecondary, cursor: 'pointer', fontSize: '10px' }}
                              onClick={() => linkImageInputRef.current?.click()}>
                              <FileImage className="w-3.5 h-3.5" /> Add link image
                            </button>
                          )}
                          <input ref={linkImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleLinkImageUpload} />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Engagement Metrics ─── */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold" style={{ color: darkLabelColor, fontSize: '11px' }}>Engagement Metrics</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ field: 'likes' as const, label: 'Likes', icon: Heart },
                        { field: 'comments' as const, label: 'Comments', icon: MessageSquare },
                        { field: 'shares' as const, label: 'Shares', icon: Share2 }
                      ].map(item => (
                        <div key={item.field} className="space-y-0.5">
                          <Label className="text-xs flex items-center gap-0.5" style={{ color: darkTextSecondary, fontSize: '10px' }}>
                            <item.icon className="w-2.5 h-2.5" style={{ color: '#3b5998' }} /> {item.label}
                          </Label>
                          <Input type="number" min={0} value={postData[item.field]}
                            onChange={(e) => updateField(item.field, Math.max(0, parseInt(e.target.value) || 0))}
                            className="text-sm text-center h-7" style={fileInputStyle} />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>
                        Top Liker Name
                      </Label>
                      <Input type="text" placeholder="e.g. Jane Smith" value={postData.topLikerName}
                        onChange={(e) => updateField('topLikerName', e.target.value)}
                        className="text-sm h-7" style={fileInputStyle} />
                    </div>
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Comments Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('comment')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <MessageCircle className="w-3 h-3" /> Comment Preview
                        <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>
                          ({postData.commentsList.length})
                        </span>
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.comment ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
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
                        borderColor: darkCardBorder, backgroundColor: darkInputBg,
                      }}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-7 h-7 rounded-sm overflow-hidden border flex-shrink-0 cursor-pointer"
                            style={{ borderColor: darkInputBorder, backgroundColor: '#e9eaed' }}
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
                            <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '9px' }}>Timestamp</Label>
                            <Input type="text" placeholder="2 hrs" value={c.commentTimestamp}
                              onChange={(e) => updateComment(c.id, 'commentTimestamp', e.target.value)}
                              className="text-sm h-6" style={{ ...fileInputStyle, fontSize: '11px' }} />
                          </div>
                          <div className="w-16">
                            <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '9px' }}>Likes</Label>
                            <Input type="number" min={0} value={c.commentLikes}
                              onChange={(e) => updateComment(c.id, 'commentLikes', Math.max(0, parseInt(e.target.value) || 0))}
                              className="text-sm h-6 text-center" style={{ ...fileInputStyle, fontSize: '11px' }} />
                          </div>
                        </div>
                        {/* ─── Replies ─── */}
                        {c.replies.length > 0 && (
                          <div style={{ marginTop: '6px', marginLeft: '8px', paddingLeft: '8px', borderLeft: `2px solid ${darkCardBorder}` }}>
                            <div style={{ fontSize: '10px', fontWeight: 600, color: '#3b5998', marginBottom: '4px' }}>
                              {c.replies.length === 1 ? '1 reply' : `${c.replies.length} replies`}
                            </div>
                            {c.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-1.5 mb-1.5">
                                <Input type="text" placeholder="Name" value={reply.name}
                                  onChange={(e) => updateReply(c.id, reply.id, 'name', e.target.value)}
                                  className="text-xs h-5 w-20 flex-shrink-0" style={{ ...fileInputStyle, fontSize: '10px' }} />
                                <Input type="text" placeholder="Reply text" value={reply.text}
                                  onChange={(e) => updateReply(c.id, reply.id, 'text', e.target.value)}
                                  className="text-xs h-5 flex-1" style={{ ...fileInputStyle, fontSize: '10px' }} />
                                <Input type="text" placeholder="Time" value={reply.timestamp}
                                  onChange={(e) => updateReply(c.id, reply.id, 'timestamp', e.target.value)}
                                  className="text-xs h-5 w-14 flex-shrink-0" style={{ ...fileInputStyle, fontSize: '10px' }} />
                                <button className="text-red-400 hover:text-red-600 p-0.5 flex-shrink-0" onClick={() => removeReply(c.id, reply.id)}>
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <button className="flex items-center gap-1 mt-1.5 text-xs font-medium rounded border px-2 py-0.5 transition-all"
                          style={{ borderColor: darkCardBorder, backgroundColor: darkInputBg, color: darkTextSecondary, fontSize: '9px' }}
                          onClick={() => addReply(c.id)}>
                          <Plus className="w-2.5 h-2.5" /> Add Reply
                        </button>
                      </div>
                    ))}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Post Extras ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('postExtras')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <Share2 className="w-3 h-3" /> Post Extras
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.postExtras ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
                    </button>

                    {expandedSections.postExtras && (
                      <div className="space-y-2.5 pt-1">
                        {/* Shared By Text */}
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            <Share2 className="w-3 h-3" /> Shared By Text
                            <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>("X shared a link")</span>
                          </Label>
                          <Input type="text" placeholder="e.g. Tech Blog"
                            value={postData.sharedByText} onChange={(e) => updateField('sharedByText', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>

                        {/* Is Edited */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
                              Show "Edited" Indicator
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.isEdited)}
                            onClick={() => updateField('isEdited', !postData.isEdited)}>
                            {postData.isEdited ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Engagement Visibility */}
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            <ShieldCheck className="w-3 h-3" /> Engagement Visibility
                          </Label>
                          <div className="flex gap-0.5">
                            {engagementVisibilityOptions.map(opt => (
                              <button key={opt.value} onClick={() => updateField('engagementVisibility', opt.value)}
                                className="flex-1 flex items-center justify-center gap-0.5 py-1.5 rounded border text-xs font-medium transition-all"
                                style={{
                                  ...toggleBtnStyle(postData.engagementVisibility === opt.value),
                                  fontSize: '9px',
                                }}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Comment Sort Order */}
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            <ArrowDownNarrowWide className="w-3 h-3" /> Comment Sort Label
                          </Label>
                          <select
                            value={postData.commentSortOrder}
                            onChange={(e) => updateField('commentSortOrder', e.target.value as CommentSortOrder)}
                            className="text-xs rounded border px-2 py-1.5 flex-1"
                            style={{
                              borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkLabelColor,
                              fontSize: '11px', height: '28px',
                            }}
                          >
                            {commentSortOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Pinned Post */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <svg viewBox="0 0 16 16" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 1L4 7v8h3v-5h2v5h3V7L10 1z" fill="#3b5998" opacity="0.7"/>
                            </svg>
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
                              Pinned Post
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.isPinned)}
                            onClick={() => updateField('isPinned', !postData.isPinned)}>
                            {postData.isPinned ? 'On' : 'Off'}
                          </button>
                        </div>

                        {/* Sponsored By */}
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            <span style={{ fontSize: '10px' }}>📢</span> Sponsored By
                            <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>(advertiser name)</span>
                          </Label>
                          <Input type="text" placeholder="e.g. TrendyApp"
                            value={postData.sponsoredBy} onChange={(e) => updateField('sponsoredBy', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>

                        {/* Custom Badge Text */}
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            <span style={{ fontSize: '10px' }}>⚡</span> Custom Badge
                            <span style={{ color: darkTextSecondary, fontWeight: 400, fontSize: '10px' }}>(yellow banner)</span>
                          </Label>
                          <Input type="text" placeholder="e.g. Breaking News, Important Update"
                            value={postData.customBadgeText} onChange={(e) => updateField('customBadgeText', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Group Post Section ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('groupPost')}>
                      <div className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <UsersRound className="w-3 h-3" /> Group Post
                        {postData.groupPostName && (
                          <span className="px-1.5 py-0 rounded text-xs font-bold" style={{ backgroundColor: '#e7f3ff', color: '#3b5998', fontSize: '9px' }}>ON</span>
                        )}
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.groupPost ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
                    </button>
                    {expandedSections.groupPost && (
                      <div className="space-y-2 pt-1">
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: darkLabelColor, fontSize: '11px' }}>
                            Group Name
                          </Label>
                          <Input type="text" placeholder="e.g. Bay Area Foodies"
                            value={postData.groupPostName} onChange={(e) => updateField('groupPostName', e.target.value)}
                            className="text-sm h-7" style={fileInputStyle} />
                        </div>
                        <div className="space-y-0.5">
                          <Label className="text-xs" style={{ color: darkTextSecondary, fontSize: '10px' }}>Group Avatar (32×32)</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded overflow-hidden border flex-shrink-0 cursor-pointer"
                              style={{ borderColor: darkInputBorder, backgroundColor: '#e9eaed' }}
                              onClick={() => groupAvatarInputRef.current?.click()}>
                              {postData.groupPostAvatar ? (
                                <img src={postData.groupPostAvatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Upload className="w-3 h-3" style={{ color: '#9197a3' }} />
                                </div>
                              )}
                            </div>
                            <input ref={groupAvatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleGroupAvatarUpload} />
                            {postData.groupPostAvatar && (
                              <button className="text-red-400 hover:text-red-600 p-0.5" onClick={() => updateField('groupPostAvatar', '')}>
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            <span style={{ fontSize: '10px', color: darkTextSecondary }}>
                              {postData.groupPostName ? `Group · 45K members` : 'Set name above to preview'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator style={{ backgroundColor: isDark ? '#3a3a5c' : '#eee' }} />

                  {/* ─── Advanced Options ─── */}
                  <div>
                    <button className="w-full flex items-center justify-between py-0.5" onClick={() => toggleSection('advanced')}>
                      <div className="text-xs font-semibold flex items-center gap-1.5"
                        style={{ color: darkLabelColor, fontSize: '11px' }}>
                        <Monitor className="w-3 h-3" /> Advanced Options
                        <span className="text-xs px-1.5 py-0 rounded-full font-bold" style={{
                          backgroundColor: enabledAdvancedCount > 0 ? '#e7f3ff' : isDark ? '#1e1e38' : '#f0f2f5',
                          color: enabledAdvancedCount > 0 ? '#3b5998' : darkTextSecondary,
                          fontSize: '9px',
                          minWidth: '16px', textAlign: 'center', lineHeight: '16px',
                          border: `1px solid ${enabledAdvancedCount > 0 ? '#a8c7fa' : darkCardBorder}`,
                        }}>
                          {enabledAdvancedCount}
                        </span>
                      </div>
                      <div style={{ transition: 'transform 0.2s ease', transform: expandedSections.advanced ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown className="w-3 h-3" style={{ color: darkTextSecondary }} /></div>
                    </button>

                    {expandedSections.advanced && (
                      <div className="space-y-2.5 pt-1">
                        {/* Show Nav Bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Monitor className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
                              More Stories Below
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-all"
                            style={toggleBtnStyle(postData.showMoreStories)}
                            onClick={() => updateField('showMoreStories', !postData.showMoreStories)}>
                            {postData.showMoreStories ? 'On' : 'Off'}
                          </button>
                        </div>
                        <p style={{ fontSize: '9px', color: darkTextSecondary, paddingLeft: '18px' }}>
                          Shows mini post cards below the main post (like 2014 FB feed)
                        </p>

                        {/* Border Radius Slider */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
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
                                  borderColor: postData.postBackground === bg.value ? '#3b5998' : darkCardBorder,
                                  backgroundColor: postData.postBackground === bg.value ? '#e7f3ff' : darkInputBg,
                                  fontSize: '10px',
                                  color: darkLabelColor,
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

                        {/* Font Family */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <TypeIcon className="w-3 h-3" style={{ color: '#3b5998' }} />
                            <span style={{ fontSize: '11px', color: darkLabelColor, fontWeight: 600 }}>
                              Post Font
                            </span>
                          </div>
                          <select
                            value={postData.postFontFamily}
                            onChange={(e) => updateField('postFontFamily', e.target.value)}
                            className="text-xs rounded border px-2 py-1.5 w-full"
                            style={{
                              borderColor: darkInputBorder, backgroundColor: darkInputBg, color: darkLabelColor,
                              fontSize: '11px', height: '28px',
                            }}
                          >
                            {fontFamilyOptions.map(f => (
                              <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── Keyboard Shortcuts Footer ─── */}
                  <div style={{
                    fontSize: '9px', color: darkTextSecondary,
                    borderTop: `1px solid ${isDark ? '#3a3a5c' : '#eee'}`,
                    paddingTop: '8px', marginTop: '4px',
                  }}>
                    <div className="flex items-center gap-1 mb-1">
                      <Keyboard className="w-3 h-3" />
                      <span style={{ fontWeight: 600 }}>Keyboard Shortcuts</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <span><kbd style={{ backgroundColor: isDark ? '#1e1e38' : '#f0f2f5', padding: '0 4px', borderRadius: '3px', border: `1px solid ${darkCardBorder}`, fontSize: '8px' }}>Ctrl+S</kbd> Save</span>
                      <span><kbd style={{ backgroundColor: isDark ? '#1e1e38' : '#f0f2f5', padding: '0 4px', borderRadius: '3px', border: `1px solid ${darkCardBorder}`, fontSize: '8px' }}>Ctrl+E</kbd> Export PNG</span>
                      <span><kbd style={{ backgroundColor: isDark ? '#1e1e38' : '#f0f2f5', padding: '0 4px', borderRadius: '3px', border: `1px solid ${darkCardBorder}`, fontSize: '8px' }}>Ctrl+Z</kbd> Reset (×2)</span>
                    </div>
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
                        backgroundColor: '#ffffff', color: darkLabelColor, fontSize: '10px', height: '32px',
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
                        backgroundColor: '#ffffff', color: darkLabelColor, fontSize: '10px', height: '32px',
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
                        backgroundColor: '#ffffff', color: darkLabelColor, fontSize: '10px', height: '32px',
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
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#e7f3ff', color: '#3b5998', borderColor: '#a8c7fa', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      Full Layout
                    </span>
                  )}
                  {postData.postType === 'lifeevent' && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#dbe8f7', color: '#2d5a9e', borderColor: '#a8c7fa', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      🎓 Life Event
                    </span>
                  )}
                  {postData.postType === 'poll' && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#e8f4ea', color: '#137333', borderColor: '#a8dab5', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      📊 Poll
                    </span>
                  )}
                  {postData.groupPostName && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#e8f4ea', color: '#137333', borderColor: '#a8dab5', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      👥 Group Post
                    </span>
                  )}
                  {postData.showWatermark && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#fff7e0', color: '#8a6d3b', borderColor: '#f0d68a', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      Watermark
                    </span>
                  )}
                  {postData.postFontFamily !== 'default' && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', borderColor: '#d8b4fe', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      ✏️ Custom Font
                    </span>
                  )}
                  {postData.textStyle !== 'normal' && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#f0d68a', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      {postData.textStyle === 'bold' ? 'B Bold' : postData.textStyle === 'italic' ? 'I Italic' : 'Aa Large'}
                    </span>
                  )}
                  {postData.isPinned && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#e8f0fe', color: '#1a56db', borderColor: '#a8c7fa', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      📌 Pinned
                    </span>
                  )}
                  {postData.sponsoredBy && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#f3f4f6', color: '#4b5563', borderColor: '#d1d5db', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      📢 Sponsored
                    </span>
                  )}
                  {postData.customBadgeText && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#fff8e1', color: '#e65100', borderColor: '#ffcc02', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      ⚡ {postData.customBadgeText}
                    </span>
                  )}
                  {validImages.length >= 2 && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ backgroundColor: '#e0f2fe', color: '#0369a1', borderColor: '#93c5fd', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                      🖼 Multi-Photo
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium border"
                    style={{ backgroundColor: '#e6f4ea', color: '#137333', borderColor: '#a8dab5', fontSize: '11px', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
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
