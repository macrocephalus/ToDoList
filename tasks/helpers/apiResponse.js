successResponse = function (res, msg) {
	var data = {
		status: true,
		message: msg
	};

	return res.status(200).json(data);
};

successResponseWithData = function (res, msg, data) {
	var resData = {
		status: true,
		message: msg,
		data: data
	};

	return res.status(200).json(resData);
};

errorResponse = function (res, msg) {
	var data = {
		status: falses,
		message: msg,
	};

	return res.status(500).json(data);
};

notFoundResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
	};

	return res.status(404).json(data);
};

validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: false,
		message: msg,
		data: data
	};
	
	return res.status(400).json(resData);
};

module.exports = {
	successResponse,
	successResponseWithData,
	errorResponse,
	validationErrorWithData,
	notFoundResponse
};