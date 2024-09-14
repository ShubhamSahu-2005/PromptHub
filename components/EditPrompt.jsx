'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // used to know which user is logged in
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  
  const [submitting, setSubmitting] = useState(false); // to know user is submitting the prompt or not
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Fetch prompt details and set the post state
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error('Failed to fetch prompt details');
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  // Handle form submission to update the prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error updating the prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;