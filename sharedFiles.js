export let MOVIE_DATA_FOR_DETAILS_VIEW = null;

class MOVIE_DATA_FOR_DETAILS_VIEW_CLS{
    constructor(){
        this.movieData = null
    }
    setMovieData($data){
        console.log('SETTING MOVIE DATA in (CLASS)');
        let correctedData = {};
        correctedData = {...$data};
        if('galaryImages'  in correctedData === false){
            correctedData.galaryImages = []
        }
        this.movieData = $data
    }
    getMovieData(){
        console.log('READING MOVIE DATA in (CLASS)');
        return this.movieData;
    }
}

export default  new MOVIE_DATA_FOR_DETAILS_VIEW_CLS()