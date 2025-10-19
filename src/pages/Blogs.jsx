import React from 'react';
import { BLOGS } from '../data/blogData.js'; 
import BlogCard from '../components/BlogCard';

export default function Blogs() {
  return (
    <main className="container my-4">
      <h1 className="text-center mb-4">Blogs</h1>
      <div className="row g-4">
        
        {BLOGS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}

      </div>
    </main>
  );
}