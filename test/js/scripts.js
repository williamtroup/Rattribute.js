( () => {
    document.addEventListener( "DOMContentLoaded", () => {
        document.title += ` - v${$rattribute.getVersion()}`;
        document.getElementById( "header" ).innerText = document.title;
    } );
} )();

function setConfiguration() {
    $rattribute.setConfiguration( {
        responsiveDelay: 500,
    } );
}

function getVersion() {
    console.log( $rattribute.getVersion() );
}

function start() {
    $rattribute.start();
}

function stop() {
    $rattribute.stop();
}

function fetch() {
    $rattribute.fetch();
}

function refresh() {
    $rattribute.refresh();
}

function targetFunc() {
    return "_blank";
}

function targetFuncWithArgs( parent ) {
    return parent ? "_parent" : "_self";
}

function getElements() {
    console.log( $rattribute.getElements() );
}