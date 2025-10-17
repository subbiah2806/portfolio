## Analysis Results

### Installed shadcn Components

1. AudioPlayer.tsx
2. CursorToggle.tsx
3. CustomCursor.tsx
4. DataFetchWrapper.tsx
5. ErrorBoundary.tsx
6. SEO.tsx
7. ScrollToTop.tsx
8. ThemeToggle.tsx
9. alert.tsx
10. badge.tsx
11. button.tsx
12. card.tsx
13. form.tsx
14. input.tsx
15. label.tsx
16. separator.tsx
17. sheet.tsx
18. skeleton.tsx
19. tabs.tsx
20. textarea.tsx

### Component Usage Analysis

#### Actively Used Components

1. `badge.tsx`:
   - Used in:
     - Projects.tsx
     - Hero.tsx
     - Skills.tsx
     - Home.tsx

2. `button.tsx`:
   - Used in:
     - AudioPlayer.tsx
     - CursorToggle.tsx
     - ThemeToggle.tsx
     - Header.tsx
     - Projects.tsx
     - Hero.tsx
     - Home.tsx
     - Contact.tsx

3. `card.tsx`:
   - Used in:
     - Projects.tsx
     - Skills.tsx

4. `sheet.tsx`:
   - Used in:
     - Header.tsx (multiple sub-components)

5. `input.tsx`:
   - Used in:
     - Contact.tsx

6. `textarea.tsx`:
   - Used in:
     - Contact.tsx

7. `CustomCursor.tsx`:
   - Used in:
     - App.tsx

8. `ErrorBoundary.tsx`:
   - Used in:
     - main.tsx

9. `SEO.tsx`:
   - Used in:
     - App.tsx

10. `ScrollToTop.tsx`:
    - Used in:
      - App.tsx

### Unused Components

1. DataFetchWrapper.tsx
2. separator.tsx
3. skeleton.tsx
4. label.tsx (partially used in form.tsx internally)
5. tabs.tsx
6. alert.tsx
7. AudioPlayer.tsx
8. CursorToggle.tsx
9. ThemeToggle.tsx (potential use in Header.tsx)

### Recommendations

1. Remove Completely
   - `DataFetchWrapper.tsx`
   - `separator.tsx`
   - `skeleton.tsx`
   - `alert.tsx`

2. Conditionally Remove
   - `AudioPlayer.tsx`: Could be removed if not actively used
   - `CursorToggle.tsx`: Check specific use case in Header.tsx
   - `ThemeToggle.tsx`: Verify if it's currently functional

3. Keep Partially Used
   - `label.tsx`: Used internally by other form components
   - `tabs.tsx`: Might be used in future or by a library

4. Documentation Updates
   - Add comments explaining the purpose of unused components
   - Consider moving unused components to an archive folder instead of deleting

**Status**: Success
**Files Analyzed**: 20
**Components Found**: 20
**Unused Components**: 9
