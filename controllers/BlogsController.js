const viewPath = "blogs";
const Blogs = require("../models/blog");

exports.index = async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ updatedAt: "desc" });

    res.render(`${viewPath}/index`, {
      pageTitle: "",
      blogs: blogs,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.show = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.render(`${viewPath}/show`, {
      pageTitle: "",
      blog: blog,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.new = (req, res) => {
  try {
    res.render(`${viewPath}/new`, {
      pageTitle: "",
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.create = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    req.flash("success", "This hero was registered successfully");
    res.redirect(`/blogs/${blog.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");

    res.redirect("/");
  }
};

exports.edit = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id);

    res.render(`${viewPath}/edit`, {
      pageTitle: "",
      formData: blog,
    });
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    await Blog.validate(req.body);
    await Blog.updateOne(req.body);

    req.flash("success", "This hero was updated successfully");
    res.redirect(`/blogs/${req.body.id}`);
  } catch (error) {
    req.flash("danger", "There was an issue fetching the superheroes list");
    res.redirect("/");
  }
};
