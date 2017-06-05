
<div id="section-event-create" class="section">

    <div id="article-event-create" class="articles">
        <!-- FORM CONTAINER -->
        <form id="form-event-create" class="form">

            <h2 class="form-header">Create event</h2>
            <input class="hidden-inputs" name="eid" type="text">

            <!-- FORM GROUP -->
            <label for="txt-event-name">Name</label>
            <input id="txt-event-name" name="ename" type="text" placeholder="Event name">

            <!-- FORM GROUP -->
            <label for="txt-event-name">Description</label>
            <textarea id="txt-event-desc" name="edesc" type="textarea" rows="8" placeholder="Event description"></textarea>
            <!-- event-create ERROR NOTIFACTION-->

            <!-- FORM GROUP -->
            <label for="txt-event-st">Event date</label>
            <input id="txt-event-ed" name="ed" type="date">
            <!-- FORM GROUP -->
            <label for="txt-event-st">Start time</label>
            <input id="txt-event-st" name="st" type="time">

            <!-- FORM GROUP -->
            <label for="txt-event-et">End time</label>
            <input id="txt-event-et" name="et" type="time">

            <div id="file-event-image">           
                <input class="file" type="file" name="file-0">
                <img class="img-preview" src=""></img>     
            </div>

            <!-- SUBMIT BUTTON -->
            <div id="btn-event-create-user" class="button-green button" >Create event</div>

        </form>
    </div>
</div>
