//Better code writing practice

async function createUser(req, res) {
  try {
    const { name, password, email, location } = req.body;
    console.log(req.body);

    // await User.create({
    //   name: req.body.name,
    //   password: req.body.password,
    //   email: req.body.email,
    //   location: req.body.location,
    // });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
    console.log(error);
  }
}
module.exports = { createUser };
