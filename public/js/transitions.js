function blackOut() {
    overlay = document.createElement('div');
    document.querySelector('body').appendChild(overlay);
    setAttributes(overlay, {
        position: 'absolute',
        width: '100vw',
        height: '100vh'
    });
}
