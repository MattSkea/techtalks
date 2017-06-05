
<div id="section-partner-edit" class="section">
    <div id="article-partner-edit" class="articles">
        <!-- FORM CONTAINER -->
        <form id="form-partner-edit" class="form">

            <h2 class="form-header">Edit partner</h2>
            <input class="hidden-inputs" name="ppid" type="text">

            <!-- FORM GROUP -->
            <label for="txt-partner-name">Name</label>
            <input id="txt-partner-name" name="ppname" type="text" placeholder="Partner name">

            <!-- FORM GROUP -->
            <label for="txt-partner-url">URL</label>
            <input id="txt-partner-url" name="ppurl" type="text" placeholder="Partner url">

            <div id="file-partner-image">           
                <input class="file" type="file" name="file-0">
                <img class="img-preview" src=""></img>     
            </div>

            <label for="txt-partner-event-links">Link to event</label>
            <select id="txt-partner-event-links" name="elink">
                <option value="20008">Microsoft</option>
            </select>

            <!-- FORM GROUP -->
            <label for="txt-partner-event-links">Link event</label>
            <select id="txt-partner-event-links" name="elink">
                <option value="40008">React Native March Meetup</option>
                <option value="60008">The Brain and the Interface</option>
            </select>

            <!-- FORM GROUP -->
            <label for="txt-partner-event-links">To partner</label>
            <select id="txt-partner-event-links" name="plink">
                <option value="20008">Microsoft</option>
                <option value="200012">Falcon</option>
            </select>

            <!-- SUBMIT BUTTON -->
            <div id="btn-partner-edit" class="button-green button" >Edit partner</div>

        </form>
    </div>
</div>
