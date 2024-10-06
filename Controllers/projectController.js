const projects=require('../Models/projectSchema')
//
exports.addProject=async(req,res)=>{
    console.log("Inside add project conroller");
    const userId=req.payload;
    console.log("userId: - ",userId);
    
    //request we are getting is form data
    //so it isnot possible to directly acssc the data
    //we need to use multer module to deal with multipart/form data
    const projectImage =req.file.filename
    console.log("image file name",projectImage);
    const {title,language,github,website,overview}=req.body;
    try{
        const existingproject= await projects.findOne({github:github})
        if(existingproject)
        {
            return res.status(409).json({ message: "Project already exists" });
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            });
            await newProject.save()
            return res.status(201).json({message: "Project upload Successfully"})

        }
    }catch(err)
    {
        return res.status(401).json({message: "Project upload Failed",err})

    }

}

 // 1) Get any 3 project details for home page
exports.getHomeproject = async (req, res) => {
    try {
        const homeproject = await projects.find().limit(3);
        res.status(200).json({ homeproject });
    } catch (err) {
        res.status(500).json({ error: "Request failed due to: " + err.message });
    }
}

// 2) Get all projects
exports.getAllproject = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey)
    const searchQuery = {
        // language:{
        //     // i is used to remove case sensitivity 
        //     $regex:searchKey,$options:'i'
        // }
        $or: [
            {
                language: {
                    $regex: searchKey, 
                    $options: 'i' // Case-insensitive search for language
                }
            },
            {
                title: {
                    $regex: searchKey, 
                    $options: 'i' // Case-insensitive search for title
                }
            }
        ]
    }
    try {
        const allproject = await projects.find(searchQuery);
        res.status(200).json({ allproject });
    } catch (err) {
        res.status(500).json({ error: "Request failed due to: " + err.message });
    }
}

// 3) Get all projects uploaded by a specific user
exports.getUserproject = async (req, res) => {
    try {
        const userId = req.payload;  // Ensure this is coming from JWT middleware
        const alluserproject = await projects.find({ userId });
        res.status(200).json({ alluserproject });
    } catch (err) {
        res.status(500).json({ error: "Request failed due to: " + err.message });
    }
}
exports.editUserProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { title, language, github, website, overview, projectImage } = req.body;
    const uploadedProjectImage = req.file ? req.file.filename : projectImage;
  
    try {
      const updateProject = await projects.findByIdAndUpdate(
        {_id:id},  // Corrected: Passing the id directly
        {
          title: title,
          language: language,
          github,
          website,
          overview,
          projectImage: uploadedProjectImage,
          userId: userId,
        },
        {
          new: true,
        }
      );
      
      if (!updateProject) {
        return res.status(404).json({ message: "Project not found" }); // Added error handling for non-existent project
      }
  
      res.status(200).json(updateProject);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err });
    }
  };

  exports.deleteUserProject=async(req,res)=>{
    const{id}=req.params;
    try{
        const removedProject =await projects.findByIdAndDelete({_id:id});
        res.status(200).json(removedProject)

    }catch(error)
    {
        res.status(401).json(error)
    }
  }
  
