var MODULE = (function(){
	function greet(){
		console.log('Hi');
	}

	 return {
    hi: greet
    }
})() ;


require('./test_module.js');

MODULE.hi();
