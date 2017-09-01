const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const Project = mongoose.model('projects');
const moment = require('moment');
// const navHelper = require('../middleware/navHelper');

//============================================================//
// SEED DATABASE
//============================================================//
const posts = [
	{
		title: 'Solving Problems and Knowing When To Start Over',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle:
			'Two SSD drives share the same UUID, which causes boot time confusion.',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Solving-Problems-and-Knowing-When-To-Start-Over',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title:
			"Documents showing huge profits for Trump's Washington hotel deleted",
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Nearly $2m profit has been deleted',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle:
			'Documents-showing-huge-profits-for-Trumps-Washington-hotel-deleted',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Israel Is Literally Going Underground To Keep Hamas Out',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Israel is building an underground barrier',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Israel-Is-Literally-Going-Underground-To-Keep-Hamas-Out',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'FBI agent and daughter found guilty of murder',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Both were found guilty',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'FBI-agent-and-daughter-found-guilty-of-murder',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Eleven family members convicted following slavery trials',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'All convicted for modern slavery offences',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Eleven-family-members-convicted-following-slavery-trials',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Trump Staff Shuffle Could Improve Senate Odds',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Sen. Joe Manchin will become Secretary of Energy',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Trump-Staff-Shuffle-Could-Improve-Senate-Odds',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Japan is in striking distance of North Korea',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'North Korea is an asshole',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Japan-is-in-striking-distance-of-North-Korea',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'The Band Journey Is At War',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Bad stuff happened at the White House',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'The-Band-Journey-Is-At-War',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Fournette not impressed with NFL speed',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: "He's just too good for the NFL",
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Fournette-not-impressed-with-NFL-speed',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'Grandmother Attacked and Killed by Hippo',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Grandmother died after being attacked',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'Grandmother-Attacked-and-Killed-by-Hippo',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	},
	{
		title: 'The Nats-Giants brawl likely ended Morse’s career',
		image: 'http://i.imgur.com/e4bY8Gt.jpg',
		imgtitle: 'Stupid actions, just consequences',
		description:
			'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.\n\nSed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
		navTitle: 'The-Nats-Giants-brawl-likely-ended-Morses-career',
		timestamp: moment().format('MMMM Do YYYY'),
		createdAt: moment().unix()
	}
];

const projects = [
	{
		title: 'Apple Intel Info Loader',
		image: 'http://i.imgur.com/jQ7NiVc.png',
		imgtitle: 'Mac OS script',
		description:
			'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.',
		navTitle: 'Apple-Intel-Info-Loader'
	},
	{
		title: 'iMessage Tool',
		image: 'http://i.imgur.com/iuD2Jfq.png',
		imgtitle: 'Mac OS script',
		description:
			'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.',
		navTitle: 'iMessage-Tool'
	},
	{
		title: 'ssdtGen App',
		image: 'http://i.imgur.com/aB5Ok2M.png',
		imgtitle: 'Mac OS App',
		description:
			'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.',
		navTitle: 'ssdtGen-App'
	},
	{
		title: 'YelpCamp App',
		image: 'http://i.imgur.com/Gm6roWr.png',
		imgtitle: 'Web App',
		description:
			'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.',
		navTitle: 'YelpCamp-App'
	}
];

module.exports = seedDB = () => {
	Post.remove({}, err => {
		if (err) console.log(err);

		posts.forEach(seed => {
			Post.create(seed, err => {
				if (err) console.log(err);
			});
		});
	});

	Project.remove({}, err => {
		if (err) console.log(err);

		projects.forEach(seed => {
			Project.create(seed, err => {
				if (err) console.log(err);
			});
		});
	});
};

//============================================================//
//============================================================//
