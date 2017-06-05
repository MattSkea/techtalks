
<div id="section-users" class="section admin-section" style="display:none;">

    <!-- USERS PAGE LANDING IMAGE -->
    <div id="article-users-image" class="admin-section-image">
        <div class="fa fa-users fa-3x"></div>
        <h2>USERS</h2>
    </div>

    <!-- HEADING -->
    <div class="section-heading section-heading-home">
    </div>

    <!-- USER PAGE CONTENT -->
    <div id="article-users-content" class="articles">

        <!-- USER TABLE -->
        <div class="article-users-table" >
            <div id="user-navigation">
            </div>

            <!-- FIRST USER ROW - NAVIGATION -->
            <div id="user-layout" class="aside-user-content table-header" >
                <div class="lbl-user-email">Email</div>
                <div class="lbl-user-fname">First name</div>
                <div class="lbl-user-lname">Last name</div>
                <div class="lbl-user-mobile">Mobile</div>
             <!--    <div class="lbl-user-type">
                    <span class="fa fa-user-circle fa-fw"></span>
                    User Type
                </div> -->
                <div class="lbl-user-edit">
                    <span class=" fa fa-edit fa-fw" data-go-to="section-user-edit"></span>
                    Edit user
                </div>
                <div class="lbl-user-delete">
                    <span class="fa fa-trash fa-fw"></span>
                    Delete user
                </div>

            </div>

            <!-- SECOND USER ROW -->
            <div class="article-user-rows table-rows" >
             <div class="aside-user-content user-row dynamic-rows">
                <div class="lbl-user-id">{{id}}</div>
                <div class="lbl-user-email">{{email}}</div>
                <div class="lbl-user-fname">{{fName}}</div>
                <div class="lbl-user-lname">{{lName}}</div>
                <div class="lbl-user-mobile">{{mobile}}</div>
               <!--  <div class="lbl-user-type" data-the-icon="{{the-icon-id}}">
                    <span class="fa {{the-icon}} fa-fw"></span>
                    <div class="lbl-user-type-txt">{{the-icon-role}}</div>
                </div> -->
                <div class="btn-user-edit lbl-user-edit users-icons fa fa-edit fa-fw" data-go-to="section-register">

                </div>
                <div class="btn-user-delete lbl-user-delete users-icons fa fa-trash fa-fw">

                </div>
            </div>
        </div>
    </div>
</div>
