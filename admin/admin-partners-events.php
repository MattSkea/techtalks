<div id="section-events-partners" class="admin-section" style="display:none;">

    <!-- EVENTS PARTNERS PAGE LANDING IMAGE -->
    <div id="article-events-partners" class="admin-section-image">
        <div>
            <div class="fa fa-newspaper-o fa-2x"></div>
            <div class="fa fa fa-handshake-o fa-3x"></div>
        </div>
        <h2>EVENTS PARTNERS</h2>
    </div>

    <!-- HEADING -->
    <div class="section-heading" >
    </div>

    <!-- EVENTS PARTNERS TABLE -->
    <div class="article-event-partner-table" >
        <!-- FIRST EVENTS PARTNERS ROW -->
        <div id="event-partner-icons" class="">
            <div  class="event-partner-icon admin-button popupAdminSelect" data-popup="section-partner-event-create">
                <div  class="faicons">
                    <span class="fa fa-plus"></span><span class="fa fa-handshake-o"></span>
                </div>
                <div>Add event partner</div>					
            </div>

            <div  class="event-partner-icon popupAdminSelect admin-button" data-popup="section-partner-event-link">
                <div  class="faicons">
                    <span class="fa fa-plus"></span><span class="fa fa-link"></span>
                </div>
                <div>Link events to partners</div>                    
            </div>
        </div>
        
        <!-- SECOND EVENTS PARTNERS ROW -->
        <div id="event-partner-layout" class="aside-event-partner-content table-header" >
            <div class="lbl-event-partner-image">Image</div>
            <div class="lbl-event-partner-name">Name</div>
            <div class="lbl-event-partner-event-name">Event name</div>
            <div class="lbl-event-partner-url">URL</div>
            <div class="lbl-event-partner-view">
                <span class=" fa fa-eye fa-fw"></span>
                View event
            </div>
            
            <div class="lbl-event-partner-editdelete">
                <span class=" fa fa-edit fa-fw"></span>
                Edit event
            </div>
            <div class="lbl-event-partner-editdelete">
                <span class="fa fa-trash fa-fw"></span>
                Delete event
            </div>
        </div>
        <!-- THIRD EVENTS PARTNERS ROW -->
        <div id="dynamic-event-partner-rows" class="article-event-partner-rows table-rows" >
            <div class="aside-primary-partners-content user-row dynamic-rows">\
                <div class="lbl-partner-id">{{id}}</div>\
                <div class="lbl-primary-partners-image"><img src="{{image}}"></div>\
                <div class="lbl-primary-partners-name">{{name}}</div>\
                <div class="lbl-event-partner-url"><a href="{{url1}}" target="_blank" >{{url2}}</a></div>\
                <div class="btn-primary-partner-view lbl-primary-partner-edit primary-icons fa fa-eye fa-fw" data-go-to="section-partner-view"></div>\
                <div class="btn-primary-partner-edit lbl-primary-partner-edit primary-icons fa fa-edit fa-fw" data-popup="section-partner-edit"></div>\
                <div class="btn-primary-partner-delete lbl-primary-partner-delete primary-icons fa fa-trash fa-fw"></div>\
            </div>'

        </div>
    </div>

</div>
</div>