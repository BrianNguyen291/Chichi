# Strapi Content Types Setup Guide

This guide provides instructions for setting up the content types in Strapi for the Chi Chi Vietnamese Language School website.

## 1. Tag Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Tag"
4. Fields:
   - Name (Text - Short text)
   - Slug (UID - based on Name)
   - Type (Enumeration - options: level, format, type, category, topic)

## 2. Course Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Course"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Description (Text - Long text)
   - Long Description (Rich Text)
   - Image (Media - Single image)
   - Level (Enumeration - options: beginner, intermediate, advanced)
   - Format (Enumeration - options: online, offline)
   - Type (Enumeration - options: individual, business)
   - Price (Text - Short text)
   - Duration (Text - Short text)
   - Schedule (Text - Short text)
   - Start Date (Date)
   - Location (Text - Short text)
   - Instructor (Text - Short text)
   - Max Students (Number - Integer)
   - Prerequisites (Text - Long text)
   - Materials (Text - Long text)
   - Tags (Relation - Many-to-Many with Tag)
   - Syllabus (JSON)

## 3. Library Resource Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Library Resource"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Description (Text - Long text)
   - Content (Rich Text)
   - Image (Media - Single image)
   - File (Media - Single file)
   - Type (Enumeration - options: practice_material, vocabulary, grammar)
   - Level (Enumeration - options: beginner, intermediate, advanced)
   - Tags (Relation - Many-to-Many with Tag)
   - Featured (Boolean)

## 4. Vietnamese Exam Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Vietnamese Exam"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Description (Text - Long text)
   - Content (Rich Text)
   - Image (Media - Single image)
   - Level (Enumeration - options: A1, A2, B1, B2, C1)
   - Exam Date (Date)
   - Registration Deadline (Date)
   - Fee (Text - Short text)
   - Location (Text - Short text)
   - Requirements (Rich Text)
   - Materials (Relation - Many-to-Many with Library Resource)
   - Featured (Boolean)

## 5. Activity Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Activity"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Description (Text - Long text)
   - Content (Rich Text)
   - Image (Media - Single image)
   - Date (Date)
   - Location (Text - Short text)
   - Category (Enumeration - options: cultural_event, language_practice, workshop, field_trip)
   - Featured (Boolean)
   - Tags (Relation - Many-to-Many with Tag)

## 6. Blog Post Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Blog Post"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Description (Text - Long text)
   - Content (Rich Text)
   - Image (Media - Single image)
   - Author (Text - Short text)
   - Publish Date (Date)
   - Categories (Relation - Many-to-Many with Tag)
   - Featured (Boolean)

## 7. Page Content Type

1. Go to Content-Type Builder
2. Click "Create new collection type"
3. Name: "Page"
4. Fields:
   - Title (Text - Short text)
   - Slug (UID - based on Title)
   - Content (Rich Text)
   - SEO Title (Text - Short text)
   - SEO Description (Text - Long text)
   - Featured Image (Media - Single image)

## 8. Setting Up Permissions

After creating all content types:

1. Go to Settings > Roles
2. Click on "Public"
3. For each content type, enable the following permissions:
   - Find
   - FindOne
4. Save

## 9. Creating Sample Content

After setting up all content types, create sample content for each type to test the API endpoints.

## 10. API Token

To access the API from your Next.js application:

1. Go to Settings > API Tokens
2. Click "Create new API token"
3. Name: "Next.js App"
4. Token type: "Read-only"
5. Save and copy the token
6. Add the token to your Next.js application's environment variables 