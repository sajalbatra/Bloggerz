import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const WriteaBlogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [head,sethead]=useState("Ready to write a blog!")
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const response=await axios.post("/api/blogs/createblog",{title,content})
    if(response){
        sethead("Blog Published...")
        window.location.reload()
    } 
    setTitle('');
    setContent('');

  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>Write A blog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{head}</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={6}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WriteaBlogs;
