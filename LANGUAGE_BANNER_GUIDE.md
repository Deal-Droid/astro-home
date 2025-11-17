# Language Selection Banner - Implementation Guide

## ✅ What Was Implemented

A complete language selection system inspired by Apple's approach, featuring:

### 1. **Language Banner Component** (`src/components/language-banner.astro`)

- Top banner that appears on first visit only
- Two language buttons with native names (ภาษาไทย | English)
- Smooth slide-down animation
- Path preservation when switching languages
- localStorage-based preference storage
- Automatic error recovery

### 2. **Layout Integration** (`src/layouts/Layout.astro`)

- Banner automatically included in all pages
- Positioned at the top of the page

### 3. **Footer Synchronization** (`src/components/footer.astro`)

- Footer language switcher now updates localStorage
- Ensures banner won't reappear after language change

---

## 🎯 User Experience Flow

### First-Time Visitor:

1. User visits website (any page)
2. Banner slides down from top
3. User sees bilingual message with two language buttons
4. User clicks preferred language
5. Preference saved to localStorage
6. User redirected to selected language version (same page path)
7. Banner never shows again

### Returning Visitor:

1. User visits website
2. Banner checks localStorage
3. Finds existing preference
4. Banner doesn't appear
5. User browses normally

### Language Change via Footer:

1. User clicks language link in footer
2. System saves new preference to localStorage
3. User redirected to new language
4. Banner won't appear again (preference updated)

---

## 🔧 Technical Details

### Storage Keys

```javascript
localStorage.setItem("user-language-preference", "en" | "th");
localStorage.setItem("language-banner-shown", "true");
```

### Path Preservation Logic

When user selects a language:

- Current path: `/about` → Target: `/about` (English) or `/th/about` (Thai)
- Current path: `/th/contact` → Target: `/contact` (English) or `/th/contact` (Thai)

### Error Handling

If localStorage is corrupted or fails:

1. System clears all language data
2. Banner shows again on next visit
3. User can make fresh selection

---

## 🧪 Testing Steps

### Test 1: First Visit

1. Open browser in Incognito/Private mode
2. Visit `http://localhost:4321/`
3. **Expected:** Banner appears with slide-down animation
4. Click "English" button
5. **Expected:** Redirected to English homepage, banner disappears

### Test 2: Return Visit

1. Visit `http://localhost:4321/` again (same browser)
2. **Expected:** Banner does NOT appear

### Test 3: Path Preservation

1. Clear localStorage (DevTools → Application → Local Storage)
2. Visit `http://localhost:4321/about`
3. Banner appears
4. Click "ภาษาไทย" button
5. **Expected:** Redirected to `http://localhost:4321/th/about`

### Test 4: Footer Language Switcher

1. Visit any page
2. Scroll to footer
3. Click language link (e.g., "ภาษาไทย")
4. **Expected:** Language changes, localStorage updated
5. Reload page
6. **Expected:** Banner doesn't appear (preference saved)

### Test 5: Close Button

1. Clear localStorage
2. Visit homepage
3. Banner appears
4. Click "×" close button
5. **Expected:** Banner disappears, current language saved
6. Reload page
7. **Expected:** Banner doesn't appear

### Test 6: Error Recovery

1. Visit homepage
2. Open DevTools → Console
3. Run: `localStorage.setItem("user-language-preference", "invalid")`
4. Reload page
5. **Expected:** System detects invalid data, clears storage, shows banner

### Test 7: Mobile Responsive

1. Open DevTools → Device Toolbar
2. Select mobile device
3. Visit homepage with cleared localStorage
4. **Expected:** Banner displays properly on mobile
5. All buttons work and are easily tappable

---

## 🎨 Customization Options

### Change Banner Colors

Edit `src/components/language-banner.astro`:

```css
.language-banner {
  /* Current: Purple gradient */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* Option 1: Blue gradient */
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);

  /* Option 2: Solid color */
  background: #4f46e5;
}
```

### Change Banner Text

Edit the message in `src/components/language-banner.astro`:

```astro
<p class="language-banner-message">
  Your custom message here<br />
  <span class="text-sm opacity-90">Your subtitle here</span>
</p>
```

### Change Animation Speed

```css
.language-banner {
  transition: transform 0.3s ease-in-out; /* Change 0.3s to your preference */
}
```

### Hide Close Button

Remove the close button section from the component, or add CSS:

```css
.language-banner-close {
  display: none;
}
```

---

## 🐛 Troubleshooting

### Banner Not Appearing

1. Check browser console for errors
2. Verify localStorage is enabled (not disabled by browser/extensions)
3. Clear localStorage: `localStorage.clear()`
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Banner Appears Every Time

1. Check if localStorage is being blocked (privacy mode, extensions)
2. Verify storage keys are being saved correctly
3. Check browser console for JavaScript errors

### Language Switch Doesn't Work

1. Verify language files exist in correct folders
2. Check `astro.config.mjs` i18n configuration
3. Ensure language codes match ("en", "th")

### Path Not Preserved

1. Check URL structure
2. Verify page exists in target language folder
3. Review path regex in language-banner.astro

---

## 📝 File Structure

```
src/
├── components/
│   ├── language-banner.astro  ← New banner component
│   └── footer.astro            ← Updated with localStorage sync
├── layouts/
│   └── Layout.astro            ← Updated with banner import
└── pages/
    ├── index.astro             ← Works automatically
    ├── about.astro             ← Works automatically
    └── th/                     ← Thai versions
        ├── index.astro
        └── about.astro
```

---

## 🚀 Deployment Checklist

- [x] Language banner component created
- [x] Integrated into Layout
- [x] Footer language switcher synced
- [x] localStorage implementation complete
- [x] Error handling implemented
- [x] Responsive design tested
- [ ] Test on staging environment
- [ ] Test with real users
- [ ] Monitor analytics for language preferences

---

## 📊 Analytics Tracking (Optional Enhancement)

To track language preferences, add to `language-banner.astro`:

```javascript
// After saveLanguagePreference(selectedLanguage)
if (typeof gtag !== "undefined") {
  gtag("event", "language_selection", {
    language: selectedLanguage,
    method: "banner",
  });
}
```

---

## 🔮 Future Enhancements (Optional)

1. **Auto-detect browser language**

   - Pre-select button based on `navigator.language`
   - Still require explicit selection

2. **Remember "don't show again" preference**

   - Add checkbox to banner
   - Store separate preference

3. **A/B Testing**

   - Test different banner positions (top vs bottom)
   - Test different copy variations

4. **Animation variations**
   - Fade in instead of slide down
   - Bounce effect

---

## 📞 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review browser console for errors
3. Test in different browsers
4. Clear cache and localStorage

---

## ✨ Success Criteria

The implementation is successful when:

- ✅ Banner appears only on first visit
- ✅ Language preference persists across sessions
- ✅ Path is preserved when switching languages
- ✅ Footer language switcher works correctly
- ✅ No console errors
- ✅ Works on mobile and desktop
- ✅ Smooth animations
- ✅ Error recovery works

---

**Implementation Date:** November 17, 2025  
**Status:** ✅ Complete and Ready for Testing
