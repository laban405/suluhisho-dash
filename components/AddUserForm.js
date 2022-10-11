import { makeStyles } from "@material-ui/core/styles";
import SuTextField from "./Inputs/SuTextField";
import SuFormControl from "./Inputs/SuFormControl";
import SuGrid from "./Layout/SuGrid";
import SuInputLabel from "./Inputs/SuInputLabel";
import SuMenuItem from "./Navigation/SuMenuItem";
import SuSelect from "./Inputs/SuSelect";
import Button from "./CustomButtons/Button";
import LocationMap from "./LocationMap";

const counties = [
  { value: "Kakamega", label: "Kakamega" },
  { value: "Kilifi", label: "Kilifi" },
  { value: "Mombasa", label: "Mombasa" },
  { value: "Nairobi", label: "Nairobi" },
];

const subCounties = [
  { value: "Butere", label: "Butere" },
  { value: "Kakamega Central", label: "Kakamega Central" },
  { value: "Kakamega East", label: "Kakamega East" },
  { value: "Kakamega North", label: "Kakamega North" },
  { value: "Kakamega South", label: "Kakamega Central" },
  { value: "Khwisero", label: "Khwisero" },
  { value: "Likuyani", label: "Likuyani" },
  { value: "Lugari", label: "Lugari" },
  { value: "Matete", label: "Matete" },
  { value: "Matungu", label: "Matungu" },
  { value: "Mumias East", label: "Mumias East" },
  { value: "Mumias West", label: "Mumias West" },
  { value: "Navakholo", label: "Navakholo" },
  { value: "Chonyi", label: "Chonyi" },
  { value: "Ganze", label: "Ganze" },
  { value: "Kaloleni", label: "Kaloleni" },
  { value: "Kaum a", label: "Kaum a" },
  { value: "Kilifi North", label: "Kilifi North" },
  { value: "Kilifi South", label: "South" },
  { value: "Magarini", label: "Magarini" },
  { value: "Malindi", label: "Malindi" },
  { value: "Rabai", label: "Rabai" },
  { value: "Changamwe", label: "Changamwe" },
  { value: "Jomvu", label: "Jomvu" },
  { value: "Kisauni", label: "Kisauni" },
  { value: "Nyali", label: "Nyali" },
  { value: "Likoni", label: "Likoni" },
  { value: "Mvita", label: "Mvita" },
  { value: "Westlands", label: "Westlands" },
  { value: "Dagoretti North", label: "Dagoretti North" },
  { value: "Dagoretti South", label: "Dagoretti South" },
  { value: "Langata", label: "Langata" },
  { value: "Roysambu", label: "Roysambu" },
  { value: "Kasarani", label: "Kasarani" },
  { value: "Ruaraka", label: "Ruaraka" },
  { value: "Embakasi South", label: "Embakasi South" },
  { value: "Embakasi North", label: "Embakasi North" },
  { value: "Embakasi Central", label: "Embakasi Central" },
  { value: "Embakasi East", label: "Embakasi East" },
  { value: "Embakasi West", label: "Embakasi West" },
  { value: "Makadara", label: "Makadara" },
  { value: "Kamukunji", label: "Kamukunji" },
  { value: "Starehe", label: "Starehe" },
  { value: "Mathare", label: "Mathare" },
];

const categories = [
  { value: "counselling", label: "Counselling" },
  { value: "hospital", label: "Hospital" },
  { value: "legal", label: "Legal" },
  { value: "police", label: "Police" },
  { value: "shelter", label: "Shelter" },
  { value: "socialwork", label: "Social Work" },
];

const useStyles = makeStyles({
  formControl: {
    width: "100%",
  },
});

function AddUserForm({ formik, onChangeUpload, location, onChangeLocation }) {
  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit}>
      <SuGrid container spacing={3}>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="First name"
            id="firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            variant="outlined"
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Last name"
            id="lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            variant="outlined"
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Phone"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            variant="outlined"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="county-select-label">County</SuInputLabel>
            <SuSelect
              required
              labelId="county-select-label"
              label="County"
              id="county"
              name="county"
              onChange={formik.handleChange}
              value={formik.values.county}
              variant="outlined"
              error={formik.touched.county && Boolean(formik.errors.county)}
            >
              {counties.map((county) => (
                <SuMenuItem key={county.value} value={county.value}>
                  {county.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="sub-county-select-label">Sub County</SuInputLabel>
            <SuSelect
              required
              labelId="sub-county-select-label"
              label="Sub County"
              id="subCounty"
              name="subCounty"
              onChange={formik.handleChange}
              value={formik.values.subCounty}
              variant="outlined"
              error={
                formik.touched.subCounty && Boolean(formik.errors.subCounty)
              }
            >
              {subCounties.map((subCounty) => (
                <SuMenuItem key={subCounty.value} value={subCounty.value}>
                  {subCounty.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <SuFormControl fullWidth className={classes.formControl}>
            <SuInputLabel id="category-select-label">Category</SuInputLabel>
            <SuSelect
              required
              labelId="category-select-label"
              label="Category"
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              variant="outlined"
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category) => (
                <SuMenuItem key={category.value} value={category.value}>
                  {category.label}
                </SuMenuItem>
              ))}
            </SuSelect>
          </SuFormControl>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="National ID"
            id="nationalID"
            name="nationalID"
            onChange={formik.handleChange}
            value={formik.values.nationalID}
            variant="outlined"
            error={
              formik.touched.nationalID && Boolean(formik.errors.nationalID)
            }
            helperText={formik.touched.nationalID && formik.errors.nationalID}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={6}>
          <SuTextField
            required
            fullWidth
            label="Profession"
            id="profession"
            name="profession"
            onChange={formik.handleChange}
            value={formik.values.profession}
            variant="outlined"
            error={
              formik.touched.profession && Boolean(formik.errors.profession)
            }
            helperText={formik.touched.profession && formik.errors.profession}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <LocationMap
            zoom={16}
            defaultCenter={location}
            location={location}
            onDragEnd={onChangeLocation}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <SuTextField
            required
            fullWidth
            label="Location"
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            variant="outlined"
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <label>
            Choose profile picture
            <input type="file" id="file" onChange={onChangeUpload} />
          </label>
        </SuGrid>
        <SuGrid item xs={12} sm={12} md={12}>
          <Button fullWidth type="submit" color="primary">
            Submit
          </Button>
        </SuGrid>
      </SuGrid>
    </form>
  );
}

export default AddUserForm;
