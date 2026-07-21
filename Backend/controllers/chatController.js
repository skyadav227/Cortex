import Chat from "../models/chat.js"

export const getChats = async (req, res) => {

  try {
    const chats = await Chat.find({
      user: req.user.id
    }).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      chats
    })
  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong."
    })
  }
}


export const createChat = async (req, res) => {

  try {
    const chat = new Chat({
      user: req.user.id,
      title: req.body.title,
      messages: []
    })

    await chat.save()

    return res.status(201).json({
      success: true,
      chat
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong."
    })

  }
}


export const sendMessage = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id
    })

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found!"
      })
    }

    chat.messages.push({
      role: req.body.role,
      text: req.body.text
    })

    await chat.save()

    return res.json({
      success: true,
      chat
    })
  }

  catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong."
    })
  }
}


export const updateTitle = async (req, res) => {

  const chat = await Chat.findOne({
    _id: req.params.id,
    user: req.user.id
  })

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found!"
    })
  }
  chat.title = req.body.title

  await chat.save()

  res.json({
    success: true,
    chat
  })
}


export const deleteChat = async (req, res) => {

  const chat = await Chat.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  })

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found!"
    })
  }

  return res.json({
    success: true,
    chat
  })
}


export const clearChats = async (req, res) => {
  const result = await Chat.deleteMany({
    user: req.user.id
  })

  return res.json({
    success: true,
    deletedCount: result.deletedCount
  })
}