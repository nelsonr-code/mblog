import WPAPI from 'wpapi';

export const site = new WPAPI({
        endpoint: 'https://saizramiro.dreamhosters.com',
        // This assumes you are using basic auth
        username: '',
        password: ''
});

site.posts().create({
    title: '',
    content: ''
})
.then( function( post ) {
    console.log(post.id);
})
.catch( function( err ) {
    
})