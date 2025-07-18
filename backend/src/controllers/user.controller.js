import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
	try {
		const currentUserId = req.user.id;
		const currentUser = req.user;

		const recommendedUsers = await User.find({
			$and: [
				{ _id: { $ne: currentUserId } },
				{ _id: { $nin: currentUser.friends } },
				{ isOnboarded: true },
			],
		});
		res.status(200).json(recommendedUsers);
	} catch (error) {
		console.error(
			"Error in getRecommendedUsers controller: ",
			error.message
		);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getMyFriends = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
			.select("friends")
			.populate(
				"friends",
				"fullName profilePic nativeLanguage learningLanguage location"
			);

		res.status(200).json(user.friends);
	} catch (error) {
		console.error("Error in getMyFriends controller: ", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const sendFriendRequest = async (req, res) => {
	try {
		const myId = req.user.id;
		const { id: recipientId } = req.params;

		// Prevent user to send request to themselves
		if (myId === recipientId) {
			return res.status(400).json({
				message: "You can't send a friend request to yourself",
			});
		}

		const recipent = await User.findById(recipientId);
		if (!recipent) {
			return res.status(404).json({ message: "Recipient not found" });
		}

		// Check if user is already a friend
		if (recipent.friends.includes(myId)) {
			return res.status(400).json({
				message: "You are already friends with this user",
			});
		}

		// Check if request already exists
		const existingRequest = await FriendRequest.findOne({
			$or: [
				{ sender: myId, recipient: recipientId },
				{ sender: recipientId, recipient: myId },
			],
		});

		if (existingRequest) {
			return res.status(400).json({
				message:
					"A friend request already exists between you and this user",
			});
		}

		const friendRequest = await FriendRequest.create({
			sender: myId,
			recipient: recipientId,
		});

		res.status(201).json(friendRequest);
	} catch (error) {
		console.error("Error in sendFriendRequest controller: ", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const acceptFriendRequest = async (req, res) => {
	try {
		const { id: requestId } = req.params;

		const friendRequest = await FriendRequest.findById(requestId);

		if (!friendRequest) {
			return res
				.status(404)
				.json({ message: "Friend request not found" });
		}

		// Verify if the current user is the recipient
		if (friendRequest.recipient.toString() !== req.user.id) {
			return res.status(403).json({
				message: "You are unauthorized to accept this request",
			});
		}

		friendRequest.status = "accepted";
		await friendRequest.save();

		// Add each user to the other's friends list
		await User.findByIdAndUpdate(friendRequest.sender, {
			$addToSet: { friends: friendRequest.recipient },
		});

		await User.findByIdAndUpdate(friendRequest.recipient, {
			$addToSet: { friends: friendRequest.sender },
		});

		res.status(200).json({ message: "Friend request accepted" });
	} catch (error) {
		console.error(
			"Error in acceptFriendRequest controller: ",
			error.message
		);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const rejectFriendRequest = async (req, res) => {
	try {
		const { id: requestId } = req.params;

		const friendRequest = await FriendRequest.findById(requestId);

		if (!friendRequest) {
			return res
				.status(404)
				.json({ message: "Friend request not found" });
		}

		// Verify if the current user is the recipient
		if (friendRequest.recipient.toString() !== req.user.id) {
			return res.status(403).json({
				message: "You are not authorized to reject this friend request",
			});
		}

		// Check if the request is not pending
		if (friendRequest.status !== "pending") {
			return res.status(400).json({
				message: `Cannot reject a ${friendRequest.status} request`,
			});
		}

		friendRequest.status = "rejected";
		await FriendRequest.findByIdAndDelete(requestId);

		res.status(200).json({ message: "Friend request rejected and deleted" });
	} catch (error) {
		console.error(
			"Error in rejectFriendRequest controller: ",
			error.message
		);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getFriendRequests = async (req, res) => {
	try {
		const pendingRequests = await FriendRequest.find({
			recipient: req.user.id,
			status: "pending",
		}).populate(
			"sender",
			"fullName profilePic nativeLanguage learningLanguage"
		);

		const acceptedRequests = await FriendRequest.find({
			sender: req.user.id,
			status: "accepted",
		}).populate("recipient", "fullName profilePic");

		// Friend requests rejected FROM the user’s perspective as sender
		const rejectedRequests = await FriendRequest.find({
			sender: req.user.id,
			status: "rejected",
		}).populate("recipient", "fullName profilePic");

		res.status(200).json({ pendingRequests, acceptedRequests, rejectedRequests });
	} catch (error) {
		console.error("Error in getFriendRequests controller: ", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getOutgoingFriendRequests = async (req, res) => {
	try {
		const outgoingRequests = await FriendRequest.find({
			sender: req.user.id,
			status: "pending",
		}).populate(
			"recipient",
			"fullName profilePic nativeLanguage learningLanguage"
		);

		res.status(200).json(outgoingRequests);
	} catch (error) {
		console.error(
			"Error in getOutgoingFriendRequests controller: ",
			error.message
		);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
