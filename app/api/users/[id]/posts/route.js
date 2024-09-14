import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const searchParams = new URL(req.url).searchParams;
        const searchQuery = searchParams.get("search"); // Get the search query from the request URL

        let prompts;

        if (searchQuery) {
            // If a search query is provided, filter based on prompt content, tag, or creator's username
            prompts = await Prompt.find({
                creator: params.id,
                $or: [
                    { prompt: { $regex: searchQuery, $options: "i" } }, // Search in prompt content (case-insensitive)
                    { tag: { $regex: searchQuery, $options: "i" } },    // Search in tag (case-insensitive)
                ]
            }).populate({
                path: 'creator',
                match: { username: { $regex: searchQuery, $options: 'i' } } // Search in username (case-insensitive)
            });
        } else {
            // If no search query is provided, return all prompts for the user
            prompts = await Prompt.find({ creator: params.id }).populate('creator');
        }

        // Filter out prompts where the creator doesn't match the search if searching by username
        const filteredPrompts = prompts.filter((prompt) => prompt.creator !== null);

        return new Response(JSON.stringify(filteredPrompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all Prompts", { status: 500 });
    }
};
