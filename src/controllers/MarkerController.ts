exports.get = (req, res) => {
    //console.log('well done');
};

exports.post = async (req, res) => {
  console.log(req.body, req.files[0]);
}
