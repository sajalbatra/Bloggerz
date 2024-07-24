"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";


const Hero = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchingBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/blogs/allblogs");
                if (response && response.data) {
                    console.log("All blogs fetched", response.data);
                    setBlogs(response.data.blogs); // Update state with fetched blogs array
                    console.log(blogs)
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchingBlogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">All Blogs Here.</h1>
            {blogs.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white dark:bg-black text-white rounded-lg shadow-md overflow-hidden">
                            <Drawer>
                                <DrawerTrigger>
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                                        <p className="text-gray-700 dark:text-white">{(blog.content.length<50)?blog.content:`${blog.content.slice(0,50)}...`}</p>
                                        <div className="mt-4">
                                            {/* <p className="text-sm text-gray-600 dark:text-white">Author: {blog.authorId}</p> */}
                                            <p className="text-sm text-gray-600 dark:text-white">Created At: {new Date(blog.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>{blog.title}</DrawerTitle>
                                        <DrawerDescription>
                                            <div className="p-4">
                                                <p className="text-gray-700 dark:text-white">{blog.content}</p>
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-600 dark:text-white">Author: {blog.authorId}</p>
                                                    <p className="text-sm text-gray-600 dark:text-white">Created At: {new Date(blog.createdAt).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <DrawerClose>
                                            <Button variant="outline">Cancel</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>

                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">No blogs available</p>
            )}
        </div>
    );
};

export default Hero;


