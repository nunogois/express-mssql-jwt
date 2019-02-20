const sql = require('mssql');

/* SQL CONFIG */
const sql_config = {
  user: 'sql_user',
  password: 'sql_pass',
  server: 'sql_server',
  database: 'sql_db'
}

sql.on('error', err => {
  console.log('SQL ERROR:');
  console.log(err);
})

var conx;
sql.connect(sql_config).then(pool => {
	conx = pool;
});

module.exports = function(query, params) {
	
	params = params || {}; // default to empty JSON if undefined
	
	var req = conx.request();

	// loop through params JSON and add them as input
	Object.keys(params).forEach(key => {
		req.input(key, params[key]);
	})
		
	return req.query(query).then(result => {
		return result.recordset;
	}).catch(err => {
		console.log(err);
		return null;
	});
}
