
<div id="section-partner-event-create" class="section">
    <div id="article-partner-event-create" class="articles">
        <!-- FORM CONTAINER -->
        <form id="form-partner-event-create" class="form">

            <h2 class="form-header">Create event partner</h2>
            <input class="hidden-inputs" name="eid" type="text">

            <!-- FORM GROUP -->
            <label for="txt-partner-event-name">Name</label>
            <input id="txt-partner-event-name" name="ename" type="text" placeholder="Partner name">

            <!-- FORM GROUP -->
            <label for="txt-partner-event-url">URL</label>
            <input id="txt-partner-event-url" name="eurl" type="text" placeholder="Partner url">


            <!-- FORM GROUP -->
            <label for="txt-partner-event-links">Link event</label>
            <select id="txt-partner-event-links" name="elink">
                <option value="40008">React Native March Meetup</option>
                <option value="60008">The Brain and the Interface</option>
            </select>
            
            <div id="file-partner-event-image">           
                <input class="file" type="file" name="file-0">
                <img class="img-preview" src=""></img>     
            </div>

            <!-- SUBMIT BUTTON -->
            <div id="btn-partner-event-create" class="button-green button" >Create event partner</div>

        </form>
    </div>
</div>
