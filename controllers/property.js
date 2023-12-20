import propDetails from "../models/propDetails.js";

export const list = async (req, res) => {
  try {
    const category = await propDetails.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
export const addProperty = async (req, res) => {
  try {
    const { propertyName, propertyDetails } = req.body;

    switch (true) {
      case !propertyName:
        return res.status(500).send({ error: "Name is Required" });
      case !propertyDetails:
        return res
          .status(500)
          .send({ error: "Proper Property Details is Required" });
      // case photo :
      //   return res
      //     .status(500)
      //     .send({ error: "Photo is Required " });
    }
    const property = new propDetails({ ...req.body });
    await property.save();
    res
      .status(201)
      .send({
        success: true,
        message: "Product created succesfully",
        property,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating products",
    });
  }
};

export const updateProperty = async (req, res) => {
  // Check if the authenticated user owns the property
  const propertyId = req.params.id;
  // const userId = req.user.id; // Assuming you have user information in req.user after authentication

  try {
    // Check if the logged-in user is the owner of the property
    const property = await propDetails.findById(propertyId)
    //   {
    //   _id: propertyId,
    //   // owner: userId,
    // });

    console.log({property})
    if (!property) {
      return res
        .status(404)
        .json({
          error:
            "Property not found or you do not have permission to update it.",
        });
    }

    // Update the property details based on the request body
    // Modify the following code based on your actual Property model structure
    console.log("name",req.body.name  )
    property.propertyName = req.body.name || property.name;
    // property.location = req.body.location || property.location;
    // property.price = req.body.price || property.price;
    // Add more fields as needed

    // Save the updated property
    const updatedProperty = await property.save();

    res.json({
      success: true,
      message: "Property updated successfully.",
      data: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    // Check if the authenticated user owns the property
    const propertyId = req.params.id;

    console.log({propertyId})
    const property = await propDetails.findById(propertyId);
    console.log({property})

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    // Check if the authenticated user is the owner of the property
    // if (property.owner !== req.user.id) {
    //   return res
    //     .status(401)
    //     .json({ msg: "Not authorized to delete this property" });
    // }

    // Delete the property from the database
    await propDetails.deleteOne();

    res.json({ msg: "Property deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
