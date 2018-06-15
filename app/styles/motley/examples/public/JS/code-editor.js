/**
 * Created by Vibhu Dujari on 4/22/18
 */

var leftPsCe= $('.pb-desk').outerWidth() - 5;
var topCeRs= $('#editor').outerHeight() - 5;
var dragPBCE= $('#dragger-ps-ce');
var dragCERS= $('#dragger-ce-rs');

function sectionToggler(){
    var section= document.getElementsByClassName('section')[0];
    var contentMedia= document.getElementsByClassName('content')[0];
    section.classList.toggle('collapse');
    contentMedia.classList.toggle('collapse');

}
$(window).on('load', ()=>{
    dragPBCE.css({'left': leftPsCe.toString()+ 'px'});
    dragCERS.css({'top': topCeRs.toString()+ 'px'});

    dragPBCE.on('mousedown', (e)=>{
        drag(e, true);
    });

    dragCERS.on('mousedown', (e)=>{
        drag(e, false, {start: 0, end: 100});
    })
});


/*{
    direction: {true: horizontal},
    limit: set start and end offset(width respect to parent) of dragger
}*/
function drag(dragevent, direction, limit){
    $(document).on('mouseup', ()=>{
        $(document).off('mousemove');
    });

    let dragger= $(dragevent.target);
    let parent= $(dragevent.target.parentElement);
    let first= $(dragevent.target.previousElementSibling);
    let second= $(dragevent.target.nextElementSibling);
    var limit= limit? limit : {start: 0, end: 0};



    $(document).on('mousemove', (e)=>{

        if(direction){
            let x= e.clientX- first.offset().left;//subtracted as clientX is in respect to viewport and not parent;
            if(x<= limit.start || x>= parent.outerWidth() - limit.end){
                return;
            }

            let leftPercent= x/ parent.outerWidth() * 100;
            first.css({'width': leftPercent.toString() + '%'});
            second.css({'width': (100-leftPercent).toString() + '%'});
            dragger.css({'left': 'calc('+ leftPercent.toString() + '% - 5px)'});
        }else{
            let y= e.clientY- first.offset().top;
            if(y<= limit.start || y>= parent.outerHeight()- limit.end){
                return;
            }

            let topPercent= y/ parent.outerHeight() * 100;
            first.css({'height': topPercent.toString() + '%'});
            second.css({'height': (100-topPercent).toString() + '%'});
            dragger.css({'top': 'calc(' + topPercent.toString() + '% - 5px)'});
        }

    })
}